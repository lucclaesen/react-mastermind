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

Another issue that came about: the mastermind state tree has three "slices", "atoms" or subdomains: 
    - selectedColor that maintains the state of the colorpicker
    - secret representing the challenge to be solved
    - the actual game. 
    
Initially, I simply wrote a reducer for each of them and combined them with the built in combineReducers. This was clearly a mistake, since some game-related actions, need the currently
selected color or the secret:
    - an action saying that a "the currently selected color" should be set on position 0 of round 0 needs to be handled by a gameReducer that obviously knowns what color is the
        currently selected one.
    - if a combination of color allocations is submitted, the game reducer needs access to the secret in order to attach feedback to a guess.

Now, this clearly indicates a flaw in my initial setup:
- either there is no way to slice up my model and it should really be treated as a single atoms
- or it is the responsibility of an action to provide the data from the "other slice". In fact (concentrating on the first case), my first intention was indeed
    - let a Guess subscribe to state changes in the color selection
    - if a peg is clicked, the action that is being dispatched then includes the currently selected color
    - in consequence, the game reducer needs no knowledge of the selectedColor atom.

However, this seems strange -- why would a guess need to rerender itself when a new color is selected?

I finally setteled on an approach suggested by Gaeron: keep the slicing and the seggregation into 3 "slice reducers", but allowing "read only access" from the game slice to the other ones.
Thus the game reducer remains responsible for determining just the next game state, but has access to elements outside it. The combination of reducers is then 

This can mean several things:
- it could mean that what I though to be 3 different slices, are really one and require to be handled by a single reducer.
- or they can be seen as different slices, but as slices that overlap and even may include 
used combineReducers to create the top-level reducer. However, combineReducerd presupposes that the combined reducers range of completely disjoint domains.
In the use case of our game, however, a 