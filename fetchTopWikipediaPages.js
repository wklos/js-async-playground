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

Promise.all(requests)
  .then((responses) => Promise.all(responses.map((r) => r.json())))
  .then((dailyJSONs) => getTop10ItemsPerEachDay(dailyJSONs).flatMap((top10ItemsPerDay) => [...top10ItemsPerDay]))
  .then((items) => sumUpViewsForSimilarItems(items))
  .then((items) => sortItemsByViews(items))
  .then((items) => addRank(items))
  .then((items) => console.log(items.slice(0, 10)));
