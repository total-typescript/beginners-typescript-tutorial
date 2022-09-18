interface LukeSkywalker {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

// Typage d'une valeur retournée par une promise. Cette valeur est retournée par la fonction
export const fetchLukeSkywalker = async (): Promise<LukeSkywalker> => {
  // On peut également typer la variable ici
  const data/* : LukeSkywalker */ = await fetch("https://swapi.dev/api/people/1").then((res) => {
    return res.json();
  });

  // On peut typer directement dans le return
  return data /* as LukeSkywalker */;
};
