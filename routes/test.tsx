import { } from "aleph/react";
import { useEffect } from "react"

import PouchDB from "pouchdb";

let db: PouchDB.Database<{}> | undefined;

if ("Deno" in window) {
  db = new PouchDB("mydb", { adapter: "idb" });
} else {
  db = undefined;
}

export default function Test() {


  //useEffect(() => {

    //console.log('db', db);

   

    async function addItem() {
      if(!db) return;
      const doc = { hello: "world" };
      const result = await db.post(doc);
      console.log("result!!!", result);
    }

    addItem();

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

  async function getDoc() {

  }

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
