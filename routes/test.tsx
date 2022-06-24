import { Head, useData } from "aleph/react";
import PouchDB from "pouchdb";

let db: PouchDB.Database<{}> | undefined;

if ("Deno" in window) {
  db = new PouchDB("mydb", { adapter: "idb" });
} else {
  db = undefined;
}

type Resume = {
  _id: string;
  key: string;
  name: string;
};

type Store = {
  resumes: Resume[];
};

const resumes = (
  await db?.allDocs({
    include_docs: true,
    attachments: true
  }).then((result: Store) => {
    return result.rows;
  }).catch((err: any) => console.log(err))
)


const store: Store = {
  resumes: resumes || []
}

export const data: Data<Store, Store> = {
  cacheTtl: 0, // no cache
  get: () => {
    //console.log("store", store);
    return store;
  },
  put: async (req) => {
    const { name } = await req.json();
    if (typeof name === "string") {
      return db?.put({ _id: new Date().toJSON(), key: new Date().toJSON(), name })
        .then((response: Store) => {
          return db?.allDocs({
            include_docs: true,
            attachments: true
          }).then((result: Store) => {
            return { resumes: result.rows };
          }).catch((err: any) => console.log(err))
        }).catch(function (err: any) {
          console.log(err);
        })
    }
  },
  patch: async (req) => {
    const { id, message, completed } = await req.json();
    const todo = store.todos.find((todo) => todo.id === id);
    if (todo) {
      if (typeof message === "string") {
        todo.message = message;
      }
      if (typeof completed === "boolean") {
        todo.completed = completed;
      }
      window.localStorage?.setItem("todos", JSON.stringify(store.todos));
    }
    return store;
  },
  delete: async (req) => {
    const { id } = await req.json();
    if (id) {
      db.get(id).then(function(doc: Resume) {
        return db.remove(doc);
      }).then(function (result: Store) {
        // handle result
      }).catch(function (err: any) {
        console.log(err);
      });
    }
    return store;
  },
};


export default function Test() {

  const { data: { resumes }, isMutating, mutation } = useData<Store>();
  //console.log("Test > resumes", resumes);

  return (
    <div className="todos-app">
      <Head>
        <title>Resumes</title>
        <meta name="description" content="A resume builder" />
      </Head>
      <h1>
        Resumes
      </h1>
      <ul>
        {resumes.map((resume) => (
          <li key={resume.key}>{ resume.doc && resume.doc.name ? resume.doc.name : 'no-name' } - {resume.id}</li>
        ))}
      </ul>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const fd = new FormData(form);
          const name = fd.get("message")?.toString().trim();
          if (name) {
            await mutation.put({ name }, {
              //optimistic update data without waiting for the server response
              optimisticUpdate: (data) => {
                return {
                  resumes: [...data.resumes, { _id: new Date().toJSON(), key: new Date().toJSON(), name }],
                };
              },
              //replace the data with the new data that is from the server response
              replace: true,
            });
            form.reset();
            setTimeout(() => {
              form.querySelector("input")?.focus();
            }, 0);
          }
        }}
      >
        <input
          type="text"
          name="message"
          placeholder="Resume Name"
          autoFocus
          autoComplete="off"
          disabled={!!isMutating}
        />
      </form>
    </div>
  );
}
