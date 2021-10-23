# Gatsby Starter Ghosted Mediawiki

A starter template to interface mediawiki article in a nice gatsby template.

![screenshot](./screenshot.png)

A lot of gatsby-starter-ghost is conveniently reused for its pretty design and well founded architecture, it is not a vanilla Gatsby module for mediawiki.

# Configuration

The default mediawiki backend that is used is wikipedia for demo purposes. You may need to edit `.ghost.json` settings to use your own backend. For example, I use this project to pull a selection of articles I have tagged under the rootCategory [[Category:Featured]] in my private mediawiki instance.

```json
{
  "development": {
    "protocol" : "https",
    "server" : "en.wikipedia.org",
    "path": "/w",
    "debug": true, 
    "userAgent": "Gatsby",
    "title" : "MediaWiki meets Gatsby",
    "description" : "Mediawiki with Gatsby frontend",
    "lang":"FR",
    "timezone":"GMT+2",
    "codeinjection_head":"",
    "codeinjection_foot":"",
    "codeinjection_styles":"",
    "rootCategory": "Linebred_animals",
    "navigation" : [
      {
        "label":"Home",
        "url":"/"
      }
  ]
  }
}

```


# Run the demo

## Quickstart

`docker run --rm --net=host netpascal0123/gatsby-starter-ghostedmediawiki:latest`

You can now view gatsby-starter-ghostedmediawiki in the browser.
⠀
  http://localhost:8000/


## Custom backend

Create a file named .ghost.json and configure the access to a custom backend.

```docker run -v  `pwd`/.ghost.json:/var/www/.ghost.json  --rm --net=host netpascal0123/gatsby-starter-ghostedmediawiki:latest```


## Development mode

I am currently improving gatsby-source-ghostedmediawiki  and gatsby-starter-ghostedmediawiki

```
git clone https://github.com/PascalNoisette/gatsby-source-ghostedmediawiki 
cd gatsby-source-ghostedmediawiki 
mkdir node_modules
git clone https://github.com/PascalNoisette/gatsby-source-ghostedmediawiki node_modules/gatsby-source-ghostedmediawiki 
docker build -t ghostedmediawiki -f Dockerfile-dev . && docker run --rm --net=host -it ghostedmediawiki

```