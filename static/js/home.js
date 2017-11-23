var global_locals

var pageSetup = function ( locals ) {
    global_locals = locals
}

var onSubmitForm = function( e ) {
    console.log('here')
    console.log(e)

    console.log( 'serialize', $('#form').serializeArray() )
    e.preventDefault()

    let message = $('#txtMessage').val()
    let is_image = $('#isImage').prop('checked')

    let people = []

    $('.person-checkbox')
    .filter( (index, element) => $( element ).prop( 'checked' ) ) // filter, use the checked only
    .each( ( index, element ) => people.push( $( element ).prop( 'id' ).replace('person_', '') ) ) // map element to id

    let headers = new Headers()
    headers.append('Content-Type', 'application/json')

    fetch( new Request('/api/send'), {
        method: 'POST',
        headers,
        body: JSON.stringify( { message, is_image, people } )
    } ).then( resp => resp.json() )
    .then( console.log )
    
}

var cmbGroupChanged = function ( e, value ) {

    var disabled = true
    if (value == '-1') {
        disabled = false
    }

    $('.person-checkbox').each( ( index, element ) => $( element ).prop( 'disabled', disabled ) )

    let group = global_locals.groups.filter( g => g.id == value )[0]

    // if we can't find the group or the group is custom then don't change anything
    if (value != 0 && !group || value == -1) return

    if (value == 0) {
        group = { people: [] }
    }

    $('.person-checkbox').each( ( index, element ) => {
        let person_id = parseInt( $( element ).prop( 'id' ).replace('person_', '') )
        if ( group.people.indexOf( person_id ) != -1 || value == 0) {
            $( element ).prop( 'checked', true )
        } else {
            $( element ).prop( 'checked', false )            
        }
    } )
}