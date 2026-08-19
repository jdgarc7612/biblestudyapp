export interface DiffToken {
  type: "match" | "missing" | "extra";
  expected?: string;
  typed?: string;
}

export interface DiffResult {
  tokens: DiffToken[];
  accuracy: number;
}

function tokenize(text: string): string[] {
  return text.trim().split(/\s+/).filter(Boolean);
}

function normalize(word: string): string {
  return word.toLowerCase().replace(/[^\p{L}\p{N}']/gu, "");
}

export function diffVerse(expectedText: string, typedText: string): DiffResult {
  const expected = tokenize(expectedText);
  const typed = tokenize(typedText);
  const expectedNorm = expected.map(normalize);
  const typedNorm = typed.map(normalize);

  const n = expectedNorm.length;
  const m = typedNorm.length;
  const lcs: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      lcs[i][j] =
        expectedNorm[i] === typedNorm[j]
          ? lcs[i + 1][j + 1] + 1
          : Math.max(lcs[i + 1][j], lcs[i][j + 1]);
    }
  }

  const tokens: DiffToken[] = [];
  let matched = 0;
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (expectedNorm[i] === typedNorm[j]) {
      tokens.push({ type: "match", expected: expected[i], typed: typed[j] });
      matched++;
      i++;
      j++;
    } else if (lcs[i + 1][j] >= lcs[i][j + 1]) {
      tokens.push({ type: "missing", expected: expected[i] });
      i++;
    } else {
      tokens.push({ type: "extra", typed: typed[j] });
      j++;
    }
  }
  while (i < n) {
    tokens.push({ type: "missing", expected: expected[i] });
    i++;
  }
  while (j < m) {
    tokens.push({ type: "extra", typed: typed[j] });
    j++;
  }

  return {
    tokens,
    accuracy: n === 0 ? 1 : matched / n,
  };
}

export function suggestGradeFromAccuracy(accuracy: number): "again" | "hard" | "good" | "easy" {
  if (accuracy >= 0.98) return "easy";
  if (accuracy >= 0.9) return "good";
  if (accuracy >= 0.7) return "hard";
  return "again";
}
