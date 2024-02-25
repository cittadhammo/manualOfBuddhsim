---
toc: false
---

# The Illustrated Manual of Buddhist Terms and Doctrines

The goal of this project is to explore the graph created by mapping the links and references of the book: A Manual of Buddhist Terms and Doctrines

<img src="./assets/cover.JPG" height=400>
<a href='./force-graph'><img src="./assets/force.JPG" height=400></a>

Buddhist Dictionary: A Manual of Buddhist Terms and Doctrines
By Nyanatiloka Thera

# References

## PDF

- [Buddhist Library PDF](https://www.buddhistelibrary.org/buddhism-online/e-books/palidictionary.pdf)
- [Buddhist University PDF](https://buddhistuniversity.net/content/reference/buddhist-dictionary_nyanatiloka)

## Online Version

- [Pali Kanon](https://www.palikanon.com/english/wtb/dic_idx.html)

## Bonus

The Illustrated History of Buddhism
By Ashin Janaka Bhivamsa (Aggamahapandita)

Artist: U Ba Kyi

- [Saraniya Website](https://saraniya.com/buddhism/buddhist-stories/the-illustrated-history-of-buddhism/)

# Processus Outline

## Data Scraping

The online version above already contains all the main entries of the dictionnary as individual web page. We can collect all [the data](./code.md) from that website and build a network of relationship. 

## Creating a graph

The easiest graph to produce is a [force directed graph](./force-graph.md). This allow to asses if there is any incongruencies in the data and have a first look at the main node. In such a graph, the edges that a going or coming (reference to or from an entry) are undiferentiated. 

We can use color gradient or arrows to show the differences, but we can also analyse the data in table according to prorpeties. 

## Edge Bundling

in 2009, researchers have develop a technique to vizualise a graph of relationships by generating a hierarchy between the nodes and then using the well known Edge Bundling technic in a radial graph.

## Algorithm Analysis

- Cycles
- Pattern recognition

## Analysis based on selected root

### Non-Recursive

### Recursive

