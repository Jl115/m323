const ARRAY = [
  { id: 1, name: "jonny" },
  { id: 2, name: "lily" },
];
console.log(ARRAY);

const NEWARRAY = [...ARRAY, { id: 3, name: "new Lily" }];
console.log(NEWARRAY);

const updatedNewArray = NEWARRAY.map(change);
function change(val) {
  if (val.id === 2) {
    return { ...val, name: "hello darkness my old friend" };
  }
  return val;
}
console.log(updatedNewArray);

const filterFirst = updatedNewArray.filter((object) => {
  return object.id !== 1;
});
console.log(filterFirst);

const reviews = [
  4.5, 4.0, 5.0, 2.0, 1.0, 5.0, 3.0, 4.0, 1.0, 5.0, 4.5, 3.0, 2.5, 2.0,
];
const totalReview = reviews.reduce((a, b) => a + b);
console.log(totalReview);

const newReview = [...reviews];
console.log(newReview);
function groupAndCountReviews(reviews) {
  let counts = {
    good: 0,
    ok: 0,
    bad: 0,
  };
  reviews.forEach((element) => {
    if (element >= 4) {
      counts.good += 1;
    } else if (element >= 2.5 && element < 4 ) {
      counts.ok += 1;
    } else {
      counts.bad += 1;
    }
  });
  return counts;
}
const reviewCount = groupAndCountReviews(newReview);
console.log(reviewCount);
