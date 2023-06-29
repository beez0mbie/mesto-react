export const hasMyLike = (card, userInfo) => card.likes.some((like) => like._id === userInfo._id);
