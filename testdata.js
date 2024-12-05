init(JSON.stringify({
    value: '{"title":"test","description":"test test","logoPosition":"right","pages":[{"name":"side1","elements":[{"type":"boolean","name":"spørsmål1","title":"test"},{"type":"text","name":"spørsmål2","visibleIf":"{spørsmål1} = false","title":"Vises pga svart nei"},{"type":"text","name":"spørsmål3","visibleIf":"{spørsmål1} = true","title":"Vises pga svart ja"}]}]}',
    type: 'builder',
    locale: 'no',
}))