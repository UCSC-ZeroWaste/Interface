# ZeroWaste Interface
## Install and Running

1. npm install
2. npm start
3. navigate to http://localhost:3000


- The Heat Map requires a `config.js` file (located in 'app' folder) with the Google Maps API key.
- The Line Chart is currently using a forked version of rd3 (hosted at https://github.com/DeliSauce/rd3). You need to npm install the forked version first and then navigate to the rd3 folder + npm install from there too.

### CSS Modules
CSS files loaded into components are locally scoped and you can point to class names with javascript. You can also compose classes together, also from other files. These are also hot loaded. Read more about them [here](http://glenmaddern.com/articles/css-modules).

To turn off CSS Modules remove it from the `webpack.config.js` file.

## Data for pickups as of Aug 3, 2017:
    Refuse:  508
    Mixed Recycle:  512
    Cardboard:  323
    GreenWaste:  32
    PRODUCT  UNKNOWN:  1

## Redux Store
Type `store.getState()` in the chrome developer console to see the current redux global state.

    sample state:
      {
        currentView: {
          scope: 'local',
          site: 'Oakes',
          view: 0
        },
        records: {
          data: {
            Oakes: [
                {Site: ...,
                Load: ...,
                PickupTime: ...,
                Product: ...,
                ...
                },
              ...
            ],
            Kresge: [
              ...
            ],
            ...
          }
          errors: [...],
          leaders: [
            {site: "Kresge", totalLoad: 6902, loadWithoutRefuse: 2862, greenRatio: 41.46624},
            {site: "Porter", totalLoad: 14695, loadWithoutRefuse: 5772, greenRatio: 39.27866},
            ...
          ]
        }
      }


- Consider parsing records.data? It currently includes all fields from each pickup. Perhaps this would be more effectively done on the backend.
    records.data: [
      { Load,
        PickupTime,
        Product,
        Site,
        ...
      },
