import { Head, useData } from "aleph/react";
import PouchDB from "pouchdb";

let db: PouchDB.Database<{}> | undefined;

if (window.document) {
  console.log("try COUCH");
  db = new PouchDB("resumes", { adapter: "idb"});
} else {
  db = undefined
}

export default function Test2() {

  return (
    <h1>Test 2</h1>

  )


}