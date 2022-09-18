import { Equal, Expect } from "./helpers/type-utils";

/**
 * Here, the id property is shared between all three
 * interfaces. Can you find a way to refactor this to
 * make it more DRY?
 */
// Héritage d'interface pour factorisation
interface Base {
  id: string;
}

interface User extends Base {
  firstName: string;
  lastName: string;
}

interface Post extends Base {
  title: string;
  body: string;
}

interface Comment extends Base {
  comment: string;
}

// Equivalent avec l'alias type
// type Base1 = {
//   id: string;
// }

// type User1 = Base1 & {
//   firstName: string;
//   lastName: string;
// }

// type Post1 = Base1 & {
//   title: string;
//   body: string;
// }

// type Comment1 = Base1 & {
//   comment: string;
// }

type tests = [
  Expect<Equal<User, { id: string; firstName: string; lastName: string }>>,
  Expect<Equal<Post, { id: string; title: string; body: string }>>,
  Expect<Equal<Comment, { id: string; comment: string }>>,
];
