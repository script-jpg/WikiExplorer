const fetch = require("isomorphic-fetch");
const cheerio = require('cheerio');
const LinkedList = require('./structs/queue');
const GeneralTree = require('./structs/GeneralTree');
const show = require("./render");

const wikipedia = 'https://api.allorigins.win/raw?url=https://en.wikipedia.org/wiki/';

async function populate(start, nChildren, nRecursions) {
    let times = 0;
    for (let i = nRecursions-1; i >= 0; i--) {
        times += Math.pow(nChildren, i);
    }
    console.log(times);
    start.replace(' ', '_');
    let links = new LinkedList();
    let tree = new GeneralTree(start);
    links.enqueue(tree);
    tree = await scrapeWiki(start, nChildren, times, links, tree);
    return tree;
}

async function scrapeWiki(start, nChildren, times, links, tree, currRecursions=0) {
    let original = tree;
    let response = await fetch(`${wikipedia}${start}`);
    console.log(response);
    if (response.ok == true) {
        let html = await response.text();
        while (currRecursions < times) {
            let $ = cheerio.load(html);
            $('#bodyContent').remove('table');
            $ = cheerio.load($('#bodyContent').html());
            let counter = 0;
            
            
            $('a').each((index, value) => {
                if (counter < nChildren) {
                    let a = $(value).attr('href')
                    if (a !== undefined) {
                        if ((a[0] !== '#') && !(/((L|l)ist|png|JPG|svg|Portal:|Template:|'File:'|Help|Wikipedia|=|%|Special|Category|disambiguation|jpe?g|identifier|A0)/.test(a))) {
                            
                            if (a.match(/[A-Z].*/)) {
                                counter++;
                                const title = a.match(/[A-Z].*/)[0]; 
                                links.enqueue(tree.addChild(title));
                            }
                            
                            
                        }
                        
                    }
                    
                } else {
                    return false;
                }
    
            })
            links.dequeue();
            start = links.getHead().getName();
            tree = links.getHead();
            response = await fetch(`${wikipedia}${start}`);
            html = await response.text();
            currRecursions++;
        }
    
        return original;
    } else {
        alert('Error, page does not exist');
        
        return null;
    }
    
    
    
    
    
}





module.exports = populate;


