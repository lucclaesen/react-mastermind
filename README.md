# mastermind with redux, react and typescript

This is my first attempt at an application slightly bigger and more complex than a todo application.

Compared to the todo mvc sample:
- I wanted to give attention to styling, which is far from my specialty - I keep feeling that
CSS is as much an enemy as it is a friend. It's hard to style an application without having to apply
some sort of CSS-hack. At least, until I read the Shay Howe CSS tutorials. Positioning with inline-block
feels very natural, the more so with react (no whitespaces between columns). See http://learn.shayhowe.com/.
- Addressing a larger problem domain with react and redux created hard to tackle issues. Adding a new feature
broke the functionality that was already there -- suddenly references to a react component that
used to be resolved just fine were now 'undefined'. It took me an hour to figure out that I had
introduced a circular dependency, which breaks old functionality. See http://stackoverflow.com/questions/35240716/webpack-import-returns-undefined-depending-on-the-order-of-imports
for a good description of the problem. 

There are a few lessons to be learned by this:
- Surprisingly, webpack by default does not check at compile time for circular dependencies. However,
there is a plugin that does precisely this and imho should be part of every webpack setup, especially
when you realize the unspecific type errors that result from circular dependencies.
- My project structure was completely wrong -- as it was driven by "code roles" and drew wrong
module boundaries. Placing containers and presentational components in two modules was especially
desastruous, since some presentational components own containers and containers wrap presentational
components, thus causing the vicious circle ...

Merging containers and presentational components into a single module that exposes only the top
level component "App" does the trick.

However, in my next project, I need to consider a completely different setup, guided by the excellent
http://jaysoo.ca/2016/02/28/organizing-redux-application/ and https://github.com/erikras/ducks-modular-redux.