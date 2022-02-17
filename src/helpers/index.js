export function formatUrl(category, tipo, dificuldade) {
  let urlPadrao= 'https://opentdb.com/api.php?amount=5';
  if(category) {
    urlPadrao += `&category=${category}`
  }
  if(tipo) 
  urlPadrao += `&type=${tipo}`
  if(dificuldade)
  urlPadrao += `&difficulty=${dificuldade}`

  return urlPadrao
} 

export async function getQuestions(token) {
  const { results } = await (await fetch(`${'https://opentdb.com/api.php?amount=5'}&token=${token}`)).json();
  return results;
}

export async function getToken() {
  const promise = await fetch('https://opentdb.com/api_token.php?command=request');
  const { token } = await promise.json();
  return token;
}

export function idGenerator() {
  const maxID = 9999999;
  return (Math.trunc(Math.random() * maxID));
}

export const category = {
  "Selecione uma categoria": '',
  Livros: 10,
  Filmes: 11,
  Musica: 12,
  'Musicais e teatro': 13,
  Televisao: 14,
  'Video Game': 15,
  'Jogos de tabuleiro': 16,
  'Anime e mangas': 31,
  'Cartoon e animaçoes': 32,
  'Historia em quadrinhos': 29,
};

const type = {
  Todos: '',
  'multipla escolha': 'multiple',
  'Verdadeiro/Falso': 'boolean'
}

const difficulty = {
  Todas: '',
  facil: 'easy',
  medio: 'medium',
  dificil: 'hard',
}

export const filter = {
  category,
  type,
  difficulty,
};

export const optionsType = ['Todos', 'multipla escolha', 'Verdadeiro/Falso']
export const optionDifficulty = ['Todas', 'facil', 'medio', 'dificil']

export const optionCategory = Object.keys(category);

export async function fetchGeneric(url) {
  const data = await (await fetch(url)).json()
  return data;
}