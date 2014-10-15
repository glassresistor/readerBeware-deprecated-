#readerBeware: WebComponents for Interactive Fiction
[![browser support](https://ci.testling.com/glassresistor/readerBeware.png)
](https://ci.testling.com/glassresistor/readerBeware)

I'm creating this as a side project to implement \<passage\> \<choice\>/\<explore\>(link is taken) and other interactive fiction primitives into a set of usable web components. The following is a WIP spec.


#Block elements

##book
Represents the top level object for a piece of IF all passages and chapter names should be unique to all children.

##chapter
Is a collection of passages that can link to each other and contain a cohesive storyline.  Chapters are linear until I work out an idea to improve them.  Should be used for serial IF where chapters do not affect each other.

##passage
Passage is the basic unit of readerBeware each page/event/interaction takes place within a passage.

###attribute - name
Used as an identifier within the book. A reserved name is 'main' and represents the passage that will be opened on start.  Each passage should have a unique name with all of its siblings(in html).  It is unclear(but interesting) to wonder what nested passages might imply.


##passageScript
Similar to the javascript `<script>` tag but runs when the passage loads.

#Inline Elements for passages

##explore
Is in short a link between passages.  Clicking/selecting text/html inside of an explore tag will change the selected passage from the current one to the one referenced but don't not affect global context.

###atrribute - link
The name of the passage to open.

###attribute - name
Used to identify the explore tag but has no meaning within readerBeware.

##choice
Is similar to explore but when a choice but any choices that shares the same name can only be clicked once and in the future all the others are greyed out or hidden.

###atrribute - link
The name of the passage to open.

###attribute - name
Names represent the name of the choice across passages and can have different link values and inside text.

#Examples

##Using explore to look around without consequences.
```html
<passage name="main">
    It was a a <explore link="look-window">bright and sunny day.</explore>
    We <explore link="open-door">open the door</explore> and walk outside.
</passage>
<passage name="look-window">
    You see a bird in the sky. <explore link="main">Look back down.</explore>
</passage>
<passage name="open-door">
    *Creak Creak* <explore link="walk-outside">Take a step outside.</explore>
</passage>
```

##Using choice to make important immutable decisions.
```html
<passage name="main">
    <p>Sally passes you a note: "Its your birthday what should we do today?"</p>
    <p><choice name="first-blood" link="angel">[ ]</choice>Rebuild the economy</p>
    <p><choice name="first-blood" link="pragmetism">[ ]</choice>Kidnap The President</p>
    <p>
        <strong>WOAH WOAH</strong>
        <em><explore link="look-around">lets take a breath!</explore></em>
    </p>
</passage>
<passage name="angel">
    You and Sally join the young idustrialists club and rebuild Galt's great machine.
</passage>
<passage name="pragmetism">
    <p><em>Cops flood in</em></p>
    <p><em>Sally pulls out her badge proudly moves behind them</em></p>
    <p>Sally:"<explore link="jail">Take their terrorist butt to jail boys!</explore></p>
</passage>
<passage name="look-around">
    <p>You step outside to catch your breath too much is happening now.
    You go out to call you friend Finn but nothing gets through.</p>
    <p>Thats when you see the SWAT bus and now its a trap!</p>
    <p>Do you <choice name="first-blood" link="fire">light the building on fire with
    Sally in it</choice> or <choice name="first-blood" link="run">just cut the tires
    and make a run for it.</choice>
</passage>
<passage name="fire">
    You watch the fires engulf the night and remember this is what snitches get.
</passage>
<passage name="run">
    <em>POP HISSSSSS</em>
    <p>Nothing more satifying than a clean get away but you can't help but feel
    burned.  Meeting an undercover via OKC! Thats a story for the books.</p>
</passage>
```

