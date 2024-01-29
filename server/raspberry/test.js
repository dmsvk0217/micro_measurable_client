const db = require("../firebase/firebase.js");

const oldFieldName = "tempareture";
const newFieldName = "temperature";

// Firestore 트랜잭션 수행
db.runTransaction(async (transaction) => {
  // 기존 문서 읽기
  const ref = db.collection("/raw-data/2024-01/day02");
  const snapshot = await transaction.get(ref);
  if (snapshot.empty) {
    console.log("No matching documents.");
    return;
  }

  snapshot
    .forEach((doc) => {
      doc.data()[newFieldName] = doc.data()[oldFieldName];
      delete doc.data()[oldFieldName];
      transaction.update(ref, doc.data());
    })
    .then(() => {
      console.log("키 이름 변경 성공");
    })
    .catch((error) => {
      console.error("키 이름 변경 실패", error);
    });
});
