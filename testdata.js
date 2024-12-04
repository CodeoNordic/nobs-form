init(JSON.stringify({
    value: '{"title":"test","description":"test test","logoPosition":"right","pages":[{"name":"page1","elements":[{"type":"boolean","name":"question1","title":"test"},{"type":"text","name":"question2","visibleIf":"{question1} = false","title":"Vises pga svart nei"},{"type":"text","name":"question3","visibleIf":"{question1} = true","title":"Vises pga svart ja"}]}]}',
    type: 'editor',
    locale: 'no',
}))