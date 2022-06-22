import { useData } from "aleph/react";
import PouchDB from "pouchdb";

let db: PouchDB.Database<{}> | undefined;

if ("Deno" in window) {
  db = new PouchDB("mydb", { adapter: "idb" });
} else {
  db = undefined;
}

type Resume = {
  id: number;
  name: string;
  message: string;
  order: number;
};

type Store = {
  resumes: Resume[];
};

//console.log("type of result", result.constructor.name);

// const store: Store = {
//   resumes: await db?.allDocs({
//       include_docs: true,
//       attachments: true
//     }).then((result: Store) => {
//       //console.log("result", result);
//       return result
//     })
//       .catch((err: any) => console.log(err))
// };

const resumes = (
  await db?.allDocs({
    include_docs: true,
    attachments: true
  }).then((result: Store) => {
    //console.log("result", result);
    return result.rows;
  })
    .catch((err: any) => console.log(err))
)

  
const store: Store = {
  resumes: resumes || []
}

console.log("store", store);

// const store: Store = ( 
//   await db?.allDocs({
//       include_docs: true,
//       attachments: true
//     }).then((result: Store) => {
//       //console.log("result", result);
//       return result.rows;
//     })
//       .catch((err: any) => console.log(err))
// );

//console.log("STORE", store);

export const data: Data<Store, Store> = {
  cacheTtl: 0, // no cache
  get: () => {
    return store;
  },
  put: async (req) => {
    const { message } = await req.json();
    if (typeof message === "string") {
      store.todos.push({ id: Date.now(), message, completed: false });
      window.localStorage?.setItem("todos", JSON.stringify(store.todos));
    }
    return store;
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
      store.todos = store.todos.filter((todo) => todo.id !== id);
      window.localStorage?.setItem("todos", JSON.stringify(store.todos));
    }
    return store;
  },
};

export default function Test() {



  //const { data: { resumes }, isMutating, mutation } = useData<Store>();
  // console.log("resumes", resumes);

  const hmmm = useData<Store>();  
  console.log("hmmm", hmmm);

  //useEffect(() => {

    //console.log('db', db);

   

    // async function addItem() {
    //   if(!db) return;
    //   const doc = { hello: "world" };
    //   const result = await db.post(doc);
    //   console.log("result!!!", result);
    // }

    // addItem();

  //})


  // const doc = { hello: "world" };
  // const result = await db.post(doc);
  // console.log("type", typeof(db));
  // console.log("result", result);

  // console.log(query.id)

  // useEffect(() => {
    
  //   if(!isReady) return

  //   async function getProducts() {
  //     // add your Realm App Id to the .env.local file
  //     const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID
  //     const app = new Realm.App({ id: REALM_APP_ID })
  //     const credentials = Realm.Credentials.anonymous()
  //     try {
  //       const user = await app.logIn(credentials);
  //       const oneProduct = await user.functions.getOneProduct(query.id)
  //       setProduct(() => oneProduct)
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }

  //   getProducts()        

  // }, [isReady, query])

//Use the 'idb' afapter for IndexedDB and persistence to disk.
  //const checkDB = () => {


    // console.log("result", result);

    // const getDoc = await db.get(result.id);

    // console.log("getDoc", getDoc);

    // const docs = await db.allDocs();

    // console.log("docs", docs);
  //}

  //async function getDoc() {

  //}

  return (
    <div className="screen e404">
    <h2>
      Just a test baby.
    </h2>
    <p>
      Bloopity blorp bleep??!!
    </p>
  </div>
  );
}
