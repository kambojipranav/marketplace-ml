// --- Simple ML Recommendation Engine (Cosine Similarity) ---

function cosineSimilarity(vecA, vecB) {
  const dot = vecA.reduce((sum, v, i) => sum + v * vecB[i], 0);
  const magA = Math.sqrt(vecA.reduce((sum, v) => sum + v * v, 0));
  const magB = Math.sqrt(vecB.reduce((sum, v) => sum + v * v, 0));
  return dot / (magA * magB);
}

export function getSimilarProducts(target, products) {
  const tokenize = text =>
    text.toLowerCase().split(/\W+/).filter(Boolean);

  const vectorize = words =>
    words.reduce((acc, w) => {
      acc[w] = (acc[w] || 0) + 1;
      return acc;
    }, {});

  const vectorArray = (vocab, obj) => vocab.map(w => obj[w] || 0);

  const targetWords = tokenize(
    `${target.title} ${target.category} ${target.tags.join(" ")}`
  );
  const productWordsList = products.map(p =>
    tokenize(`${p.title} ${p.category} ${p.tags.join(" ")}`)
  );

  const vocabulary = [...new Set([...targetWords, ...productWordsList.flat()])];

  const targetVec = vectorArray(vocabulary, vectorize(targetWords));

  return products
    .map(p => {
      const vec = vectorArray(vocabulary, vectorize(
        tokenize(`${p.title} ${p.category} ${p.tags.join(" ")}`)
      ));
      return { ...p.toObject(), similarity: cosineSimilarity(targetVec, vec) };
    })
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 5);
}
