/**
 * Solution for Sort binary tree by levels
 * @see https://www.codewars.com/kata/52bef5e3588c56132c0003bc/train/javascript
 */
function treeByLevels(rootNode) {
  if (!!!rootNode) {
    return [];
  }

  let levels = {};
  const traverseTree = (node, level) => {
    if (node === null) {
      return;
    }

    const { left, right, value } = node;

    levels[`${level}`] = [...(levels[`${level}`] || []), value]
    level++;

    traverseTree(left, level);
    traverseTree(right, level);
  }

  traverseTree(rootNode, 0);
  return Object.keys(levels).reduce((carry, item) => ([
    ...carry,
    ...levels[item],
  ]), []);
}