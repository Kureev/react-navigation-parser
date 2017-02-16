Tiny parser for react-navigation based projects
----
Parse react-navigation based project to find containers, routes, transitions etc.

Getting started
----
- Install using `npm`:
```bash
$ npm i git@github.com:Kureev/react-navigation-parser.git -g
```

- Download any react-native project, using react-navigation
- Run `parse-navigation`:
```bash
$ parse-navigation path/to/react-navigation-project
```

Example
----
For the [PocketGear](https://github.com/satya164/PocketGear) project, tool gives the following output:
<details>
```json
{  
  "containers":{  
    "/Users/<username>/PocketGear/src/components/Home.js":{  
      "navigationType":"StackNavigator",
      "routes":[  
        {  
          "name":"Main",
          "value":"/Users/<username>/PocketGear/src/components/PokemonChooser.js"
        },
        {  
          "name":"StrongAgainst",
          "value":"/Users/<username>/PocketGear/src/components/StrongAgainstList.js"
        },
        {  
          "name":"WeakAgainst",
          "value":"/Users/<username>/PocketGear/src/components/WeakAgainstList.js"
        },
        {  
          "name":"Info",
          "value":"/Users/<username>/PocketGear/src/components/PokemonInfo.js"
        }
      ],
      "component":null,
      "transitions":[  

      ]
    },
    "/Users/<username>/PocketGear/src/components/PokemonInfo.js":{  
      "navigationType":"TabNavigator",
      "routes":[  
        {  
          "name":"Details",
          "value":"/Users/<username>/PocketGear/src/components/PokemonDetails.js"
        },
        {  
          "name":"Matches",
          "value":"/Users/<username>/PocketGear/src/components/PokemonMatches.js"
        },
        {  
          "name":"Tools",
          "value":"/Users/<username>/PocketGear/src/components/PokemonTools.js"
        }
      ],
      "component":"PokemonInfo",
      "transitions":[  

      ]
    }
  },
  "components":{  
    "/Users/<username>/PocketGear/src/components/Appbar.js":{  
      "component":"Appbar",
      "transitions":[  

      ]
    },
    "/Users/<username>/PocketGear/src/components/AppbarShell.js":{  
      "component":"AppbarShell",
      "transitions":[  

      ]
    },
    "/Users/<username>/PocketGear/src/components/Attack.js":{  
      "component":"Attack",
      "transitions":[  

      ]
    },
    "/Users/<username>/PocketGear/src/components/CPCalculator.js":{  
      "component":"CPCalculator",
      "transitions":[  
        "Info"
      ]
    },
    "/Users/<username>/PocketGear/src/components/Evolution.js":{  
      "component":"Evolution",
      "transitions":[  
        "Info"
      ]
    },
    "/Users/<username>/PocketGear/src/components/GridView.js":{  
      "component":"GridView",
      "transitions":[  

      ]
    },
    "/Users/<username>/PocketGear/src/components/Heading.js":{  
      "component":"Heading",
      "transitions":[  

      ]
    },
    "/Users/<username>/PocketGear/src/components/More.js":{  
      "component":"More",
      "transitions":[  

      ]
    },
    "/Users/<username>/PocketGear/src/components/NoResults.js":{  
      "component":"NoResults",
      "transitions":[  

      ]
    },
    "/Users/<username>/PocketGear/src/components/Paragraph.js":{  
      "component":"Paragraph",
      "transitions":[  

      ]
    },
    "/Users/<username>/PocketGear/src/components/Placeholder.js":{  
      "component":"Placeholder",
      "transitions":[  

      ]
    },
    "/Users/<username>/PocketGear/src/components/PokemonChooser.js":{  
      "component":"PokemonChooser",
      "transitions":[  

      ]
    },
    "/Users/<username>/PocketGear/src/components/PokemonDetails.js":{  
      "component":"PokemonDetails",
      "transitions":[  
        "Info"
      ]
    },
    "/Users/<username>/PocketGear/src/components/PokemonList.js":{  
      "component":"PokemonList",
      "transitions":[  

      ]
    },
    "/Users/<username>/PocketGear/src/components/PokemonListCard.js":{  
      "component":"PokemonListCard",
      "transitions":[  
        "Info"
      ]
    },
    "/Users/<username>/PocketGear/src/components/PokemonMatches.js":{  
      "component":"PokemonMatches",
      "transitions":[  
        "Info",
        "StrongAgainst",
        "WeakAgainst"
      ]
    },
    "/Users/<username>/PocketGear/src/components/PokemonTools.js":{  
      "component":"PokemonTools",
      "transitions":[  
        "Info"
      ]
    },
    "/Users/<username>/PocketGear/src/components/PokemonTypeLabel.js":{  
      "component":"PokemonTypeLabel",
      "transitions":[  

      ]
    },
    "/Users/<username>/PocketGear/src/components/ProgressBar.js":{  
      "component":"ProgressBar",
      "transitions":[  

      ]
    },
    "/Users/<username>/PocketGear/src/components/SearchBar.js":{  
      "component":"SearchBar",
      "transitions":[  

      ]
    },
    "/Users/<username>/PocketGear/src/components/SpinButton.js":{  
      "component":"SpinButton",
      "transitions":[  

      ]
    },
    "/Users/<username>/PocketGear/src/components/StrongAgainstList.js":{  
      "component":"StrongAgainstList",
      "transitions":[  

      ]
    },
    "/Users/<username>/PocketGear/src/components/TouchableButton.js":{  
      "component":"TouchableButton",
      "transitions":[  

      ]
    },
    "/Users/<username>/PocketGear/src/components/TouchableItem.js":{  
      "component":"TouchableItem",
      "transitions":[  

      ]
    },
    "/Users/<username>/PocketGear/src/components/WeakAgainstList.js":{  
      "component":"WeakAgainstList",
      "transitions":[  

      ]
    }
  },
  "routes":{  
    "Main":"/Users/<username>/PocketGear/src/components/PokemonChooser.js",
    "StrongAgainst":"/Users/<username>/PocketGear/src/components/StrongAgainstList.js",
    "WeakAgainst":"/Users/<username>/PocketGear/src/components/WeakAgainstList.js",
    "Info":"/Users/<username>/PocketGear/src/components/PokemonInfo.js",
    "Details":"/Users/<username>/PocketGear/src/components/PokemonDetails.js",
    "Matches":"/Users/<username>/PocketGear/src/components/PokemonMatches.js",
    "Tools":"/Users/<username>/PocketGear/src/components/PokemonTools.js"
  }
}
```
</details>
