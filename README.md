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
              { Load: ...,
                PickupTime: ...,
                Product: ...,
                Site: ...,
                ...
              },
              { Load: ...,
                PickupTime: ...,
                Product: ...,
                Site: ...,
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


## Data for pickups as of Aug 3, 2017:
    Refuse:  508
    Mixed Recycle:  512
    Cardboard:  323
    GreenWaste:  32
    PRODUCT  UNKNOWN:  1


## Schema
- Currently fetching pickup data over a 30 day span. Each pickup has 56 key/value pairs.

    schema:
      [
        {
          Record: 98150,
          UserTmp: 0,
          PickupTime: "2017-08-30T12:49:45.000Z",
          UploadTime: "2017-08-30T12:54:02.000Z",
          AcctDetect: 3,
          Customer: "Recharge",
          CustomerName: "Recharge",
          Site: "Bin Recycling Container",
          SiteName: "Bin Recycling Container",
          ServId: "RFTVREF_15052",
          LoadmanAcct: 1063,
          LoadName: "BR-R-VIL-W-OUT",
          Asset: "000",
          AssetType: " --unspecified-- ",
          AssetRfid: null,
          Delivery: 0,
          AssetDetect: 0,
          Region: " --unspecified-- ",
          Zone: " --unspecified-- ",
          Type: " --unspecified-- ",
          Frequency: "30_R_Village",
          ServType: "Mixed Recycle-Bin",
          Quantity: 7013,
          Route: "Housing-Bin-CRV-Truck 6",
          Load: 23,
          NVW: 8964,
          Capacity: 0,
          Volume: null,
          Density: 0,
          MaxDensity: null,
          Container: 122,
          Extra3: 0,
          Extra4: 0,
          ProductId: "3",
          Product: "Mixed Recycle",
          Truck: "6",
          TruckName: "R-7876 Optimus",
          Driver: "Calderon, J.C.",
          LoadLat: 36988411,
          LoadLon: -122055398,
          ProblemCode: "NO PROBLEM",
          Problem: "- -",
          ContactName: null,
          Phone: null,
          Address: null,
          Address2: null,
          City: null,
          State: null,
          Zip: null,
          Latitude: 36988411,
          Longitude: -122055521,
          Exported: 0,
          DbExported: 0,
          ConflictType: -2147483648,
          AuditType: 0,
          row: "1"
        },
        ...
      ]
