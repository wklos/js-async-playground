export const getTop10ItemsPerEachDay = (dailyJSONs) => {
  return dailyJSONs.map((dailyJSON) => [
    ...dailyJSON?.items[0]?.articles?.slice(0, 10),
  ]);
};

export const sumUpViewsForSimilarItems = (items) => {
  let arrayOfItems = [];
  items.forEach((item) => {
    const currentArrayItem = arrayOfItems.find(
      (arrayItem) => arrayItem.article === item.article
    );

    if (currentArrayItem) {
      currentArrayItem.views += item.views;
    } else {
      arrayOfItems.push({ article: item.article, views: item.views });
    }
  });
  return arrayOfItems;
};

export const sortItemsByViews = (items) => {
  return items.sort((a, b) => b.views - a.views);
};

export const addRank = (items) => {
  return items.map((item) => ({ ...item, rank: items.indexOf(item) + 1 }));
};
