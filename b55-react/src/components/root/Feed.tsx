import {  List, } from "@mui/material"
import FeedItem from "../home/FeedItem"
const Feed = () => {
  return (
    <>
      <List sx={{ marginTop: "20px" }}>

      <FeedItem name="John Doe" username="john_doe" time="2h" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." like={10} share={5} />

      <FeedItem name="McMahon" username="mc" time="4h" text="I don't know what to write here. As soon as I get a chance,I'll write something. Still too short hmm well i wan to writesomething. " like={10} share={5} />

      <FeedItem name="Cat Lord" username="miaw_miaw" time="15h" text="Lick human with sandpaper tongue drool bite off human's toes purr like an angel pushes butt to face i'm bored inside, let me out i'm lonely outside, let me in i can't make up my mind whether to go in or out, guess i'll just stand partway in and partway out, contemplating the universe for half an hour how dare you nudge me with your foot?!?! leap into the air in greatest offense!. Ask for petting. Ptracy cats are the world lasers are tiny mice but instead of drinking water from the cat bowl, make sure to steal water from the toilet howl on top of tall thing stand in doorway, unwilling to chose whether to stay in or go out. Push your water glass on the floor make muffins in the middle of the night i crawl onto your chest and purr gently to help you sleep. Cats are the world poop in litter box, scratch the walls or bury the poop bury it deep mmmmmmmmmeeeeeeeeooooooooowwwwwwww." like={4123} share={123} />

      </List>
    </>
  )
}

export default Feed