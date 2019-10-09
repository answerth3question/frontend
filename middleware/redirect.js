export default function({ route, redirect }) {
  switch (route.fullPath) {
    case '/review/prompts':
      return redirect('/review/prompts/pending');
    case '/review/posts':
      return redirect('/review/posts/pending');
  }
}