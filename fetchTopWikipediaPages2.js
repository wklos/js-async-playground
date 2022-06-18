import {
  getTop10ItemsPerEachDay,
  sumUpViewsForSimilarItems,
  sortItemsByViews,
  addRank,
} from "./common.js";

const URL =
  "https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/";

const dates = ["2022/06/14", "2022/06/15", "2022/06/16"];
const requests = dates.map((date) => fetch(`${URL}${date}`));

const getResults = async (requests) => Promise.all(requests);
const getResultsAsJson = async (resultsArray) =>
  Promise.all(resultsArray.map((result) => result.json()));
const resultsArray = await getResults(requests);
const resultsArrayJson = await getResultsAsJson(resultsArray);
const top10ItemsByDayFlattenedArray = getTop10ItemsPerEachDay(
  resultsArrayJson
).flatMap((top10ItemsPerDay) => [...top10ItemsPerDay]);
const uniqeItemsArray = sumUpViewsForSimilarItems(
  top10ItemsByDayFlattenedArray
);
const rankedAndSortedItems = addRank(sortItemsByViews(uniqeItemsArray));
console.log(rankedAndSortedItems.slice(0, 10));
