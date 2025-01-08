init(JSON.stringify({
    value: `{"title":"test","description":"test test","logoPosition":"right","pages":[{"name":"page1","elements":[{"type":"radiogroup","name":"spørsmål1","title":"Er det hast?","description":"Husk å ikke misbruke dette!","isRequired":true,"choices":[{"value":"Item 1","text":"Ja"},{"value":"Item 2","text":"Nei - 5 uker levering"}]},{"type":"text","name":"spørsmål2","visibleIf":"{spørsmål1} = 'Item 1'","title":"Ønsket leveringsdato","isRequired":true,"inputType":"date"},{"type":"text","name":"spørsmål3","visibleIf":"{spørsmål1} = 'Item 2' or {spørsmål1} notempty","title":"Pasient nummer","isRequired":true,"inputType":"number"},{"type":"text","name":"spørsmål4","visibleIf":"{spørsmål1} notempty","title":"Order nummer","isRequired":true,"inputType":"number"},{"type":"text","name":"spørsmål5","visibleIf":"{spørsmål1} notempty","title":"Sko størrelse","isRequired":true},{"type":"radiogroup","name":"spørsmål6","visibleIf":"{spørsmål1} notempty","title":"Hva slags fotsenger","isRequired":true,"choices":[{"value":"Item 1","text":"Skann"},{"value":"Item 2","text":"Over Gips"}]},{"type":"imagepicker","name":"spørsmål7","visibleIf":"{spørsmål6} = 'Item 1'","title":"Materiale (S)","isRequired":true,"choices":[{"value":"Image 1","text":"45 Shore Black (3D 0020)","imageLink":"https://surveyjs.io/Content/Images/examples/image-picker/lion.jpg"},{"value":"Image 2","text":"35 Shore Beige (3D 0020)","imageLink":"https://surveyjs.io/Content/Images/examples/image-picker/giraffe.jpg"},{"value":"Image 3","text":"45 Shore Beige (3D 0020)","imageLink":"https://surveyjs.io/Content/Images/examples/image-picker/panda.jpg"},{"value":"Image 4","text":"Salmon 15 shore/Beige 35 (3D 0057)","imageLink":"https://surveyjs.io/Content/Images/examples/image-picker/camel.jpg"},{"value":"Image 5","text":"Blue 30 shore/Orange 40 shore (3D 0058)","imageLink":"https://cataas.com/cat"},{"value":"Image 6","text":"Blue 30 shore/Grey 40 shore (3D 0059)","imageLink":"https://cataas.com/cat"},{"value":"Image 7","text":"Blue, soft open-cell EVA, 25 Shore (3D 0043)","imageLink":"https://cataas.com/cat"},{"value":"Image 8","text":"Black 50/55 /Beige 30/35/Red 45/50 (3D 0044)","imageLink":"https://cataas.com/cat"}],"imageFit":"cover","imageHeight":300,"imageWidth":300,"showLabel":true},{"type":"radiogroup","name":"spørsmål8","visibleIf":"{spørsmål7} notempty","title":"Pelott","isRequired":true,"choices":[{"value":"Item 1","text":"6mm (Standard)"}],"showOtherItem":true,"showNoneItem":true},{"type":"matrix","name":"spørsmål9","visibleIf":"{spørsmål7} notempty","title":"Poron","isRequired":true,"columns":[{"value":"Kolonne 1","text":"Ingen"},{"value":"Kolonne 2","text":"1,5mm"},{"value":"Kolonne 3","text":"3mm"}],"rows":[{"value":"Rad 1","text":"Valg"}]},{"type":"radiogroup","name":"spørsmål10","visibleIf":"{spørsmål9.Rad 1} notempty","title":"Trekk (S)","isRequired":true,"choices":[{"value":"Item 1","text":"Leather Black"},{"value":"Item 2","text":"Leather Beige"},{"value":"Item 3","text":"Cover lining Beige"},{"value":"Item 4","text":"On-steam"},{"value":"Item 5","text":"Felt"}],"showNoneItem":true},{"type":"imagepicker","name":"spørsmål11","visibleIf":"{spørsmål6} = 'Item 2'","title":"Materiale","isRequired":true,"choices":[{"value":"Image 1","text":"Beige 25/Hvit 45 Shore","imageLink":"https://surveyjs.io/Content/Images/examples/image-picker/lion.jpg"},{"value":"Image 2","text":"Blå 35/Sort 50 Shore","imageLink":"https://surveyjs.io/Content/Images/examples/image-picker/giraffe.jpg"},{"value":"Image 3","text":"Beige 25 Shore","imageLink":"https://surveyjs.io/Content/Images/examples/image-picker/panda.jpg"},{"value":"Image 4","text":"Therrox","imageLink":"https://surveyjs.io/Content/Images/examples/image-picker/camel.jpg"}],"imageFit":"cover","showLabel":true},{"type":"radiogroup","name":"spørsmål12","visibleIf":"{spørsmål11} notempty","title":"Trekk","isRequired":true,"choices":[{"value":"Item 1","text":"Sports trekk"},{"value":"Item 2","text":"Skinn svart"},{"value":"Item 3","text":"Cover lining"}],"showNoneItem":true},{"type":"matrix","name":"spørsmål13","visibleIf":"{spørsmål10} notempty or {spørsmål11} notempty","title":"Tykkelse fotseng","isRequired":true,"columns":[{"value":"Kolonne 1","text":"3mm"},{"value":"Kolonne 2","text":"4mm"},{"value":"Kolonne 3","text":"5mm"},{"value":"Kolonne 4","text":"6mm"},{"value":"Kolonne 5","text":"8mm"},{"value":"Kolonne 6","text":"10mm"},{"value":"Kolonne 7","text":"Annet"}],"rows":[{"value":"Rad 1","text":"Forfot Venstre"},{"value":"Rad 2","text":"Forfot Høyre"},{"value":"Rad 3","text":"Hæl Venstre"},{"value":"Rad 4","text":"Hæl Høyre"}]},{"type":"radiogroup","name":"spørsmål14","visibleIf":"{spørsmål10} notempty or {spørsmål11} notempty","title":"Kiler","isRequired":true,"choices":[{"value":"Item 1","text":"Nei"},{"value":"Item 2","text":"Ja"}]},{"type":"matrix","name":"spørsmål15","visibleIf":"{spørsmål14} = 'Item 2'","title":"Kiler tykkelse/plassering","isRequired":true,"columns":[{"value":"Kolonne 1","text":"Medial 3mm"},{"value":"Kolonne 2","text":"Lateral 3mm"},{"value":"Kolonne 3","text":"Medial 4mm"},{"value":"Kolonne 4","text":"Lateral 4mm"},{"value":"Kolonne 5","text":"Medial 5mm"},{"value":"Kolonne 6","text":"Lateral 5mm"},{"value":"Kolonne 7","text":"Ingen"}],"rows":["Rad 1","Rad 2","Rad 3","Rad 4"]},{"type":"text","name":"spørsmål16","visibleIf":"{spørsmål15.Rad 1} notempty and {spørsmål15.Rad 2} notempty and {spørsmål15.Rad 3} notempty and {spørsmål15.Rad 4} notempty","title":"Annet Tykkelser kiler"},{"type":"radiogroup","name":"spørsmål17","visibleIf":"{spørsmål14} = 'Item 1' or {spørsmål15.Rad 1} notempty and {spørsmål15.Rad 2} notempty and {spørsmål15.Rad 3} notempty and {spørsmål15.Rad 4} notempty","title":"Støtdemping","isRequired":true,"choices":[{"value":"Item 1","text":"3mm Hæl"},{"value":"Item 2","text":"6mm Hæl"},"Item 3"],"showOtherItem":true,"showNoneItem":true},{"type":"text","name":"spørsmål18","visibleIf":"{spørsmål14} = 'Item 1' or {spørsmål15.Rad 1} notempty and {spørsmål15.Rad 2} notempty and {spørsmål15.Rad 3} notempty and {spørsmål15.Rad 4} notempty","title":"Annet"}]}]}`,
    type: 'builder',
    locale: 'no',
    questionTypes: `["asdasdext", "radiogroup", "imagepicker"]"`,
    creatorTabs: ["json", "preview", "asdads"]
}))


init(JSON.stringify({
    value: `{
            "logoPosition": "right",
            "pages": [
              {
                "name": "side1",
                "elements": [
                  {
                    "type": "text",
                    "name": "spørsmål1",
                    "title": "Ønsket leveringsdato",
                    "isRequired": true,
                    "inputType": "date"
                  },
                  {
                    "type": "text",
                    "name": "spørsmål2",
                    "title": "Order nummer og initialer",
                    "isRequired": true
                  },
                  {
                    "type": "radiogroup",
                    "name": "spørsmål3",
                    "title": "Type protese",
                    "choices": [
                      "Item 1",
                      "Item 2",
                      "Item 3"
                    ]
                  },
                  {
                    "type": "radiogroup",
                    "name": "spørsmål4",
                    "title": "Type protese",
                    "isRequired": true,
                    "choices": [
                      {
                        "value": "Item 1",
                        "text": "TF"
                      },
                      {
                        "value": "Item 2",
                        "text": "KD"
                      },
                      {
                        "value": "Item 3",
                        "text": "TT"
                      },
                      {
                        "value": "Item 4",
                        "text": "Delfot"
                      },
                      {
                        "value": "Item 5",
                        "text": "DS"
                      }
                    ]
                  },
                  {
                    "type": "checkbox",
                    "name": "spørsmål5",
                    "title": "Type bilaterale proteser",
                    "choices": [
                      "Item 1",
                      "Item 2",
                      "Item 3"
                    ],
                    "maxSelectedChoices": 2
                  }
                ]
              }
            ]
          }`,
    type: 'builder',
    locale: 'no',
    questionTypes: `["asdasdext", "radiogroup", "imagepicker"]"`,
    creatorTabs: ["json", "preview", "asdads"]
}))
