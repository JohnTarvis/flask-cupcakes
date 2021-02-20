const $editCupcake = $('#edit-cupcake');
const $allCupcakes = $('#all-cupcakes');
const $singleCupcake = $('#single-cupcake');
const $addCupcake = $('#add-cupcake');

function onlyShow($tag){
    $editCupcake.hide();
    $allCupcakes.hide();
    $singleCupcake.hide();
    $addCupcake.hide();
    $tag.show();
}

async function deleteCupcake(cupcake_id){
    await axios.delete(`/api/cupcakes/${cupcake_id}`);
}

async function editCupcake(cupcake_id){
    onlyShow($editCupcake);
    const response = await axios.get(`/api/cupcakes/${cupcake_id}`);
    const cupcake = response.data.cupcake;    
    $('#cupcake-image-edit').val(cupcake.image);
    $('#cupcake-flavor-edit').val(cupcake.flavor);
    $('#cupcake-size-edit').val(cupcake.size);
    $('#cupcake-rating-edit').val(cupcake.rating);
    $('#submit-edited-button').data('ccid',cupcake_id);
}
$('#submit-edited-button').click(async function(e){
    const ccid =  $('#submit-edited-button').data('ccid');
    const submittedValues = {image:    $('#cupcake-image-edit').val(),
                             flavor:   $('#cupcake-flavor-edit').val(),
                             size:     $('#cupcake-size-edit').val(),
                             rating:   $('#cupcake-rating-edit').val()};
    const json = JSON.stringify(submittedValues);
    await axios.patch(`/api/cupcakes/${ccid}`,json);
});


async function displayCupcakeDetails(cupcake_id){
    onlyShow($singleCupcake);
    const response = await axios.get(`/api/cupcakes/${cupcake_id}`);
    const cupcake = response.data.cupcake;
    $("#cupcake-image").attr("src",cupcake.image);
    $('#cupcake-flavor').html(`Flavor: ${cupcake.flavor}`);
    $('#cupcake-size').html(`Size: ${cupcake.size}`);
    $('#cupcake-rating').html(`Rating: ${cupcake.rating}`);

}
function generateCupcakeHTML(cupcake){
    return `
    <div class='cupcake-display' id='cc${cupcake.id}'>
        <div class='cupcake-img-container'>
            <img src=${cupcake.image} class='img-thumbnail cupcake-img'>
        </div>
        <div class='table-container'>
            <table>
                <tr>
                    <td>Flavor</td>
                    <td>${cupcake.flavor}</td>
                </tr>
                <tr>
                    <td>Size</td>
                    <td>${cupcake.size}</td>
                </tr>
                <tr>
                    <td>Rating</td>
                    <td>${cupcake.rating}</td
                </tr>
            </table>
        </div>
        <div class='button-pad'>
        
            <div id='det${cupcake.id}' class='btn btn-block btn-primary details'>
                Details
            </div>
            <div id='edt${cupcake.id}' class='btn btn-block btn-secondary edit'>
                Edit
            </div>
            <div id='del${cupcake.id}' class='btn btn-block btn-danger delete'>
                Delete
            </a>            
        
        </div>
    </div>
    `;
}
function displayCupcake(cupcake){
    const cupcakesDisplay = document.getElementById('cupcakes-display');
    const cupcakeHTML = generateCupcakeHTML(cupcake);
    cupcakesDisplay.innerHTML += cupcakeHTML;
}
async function getCupcakes(){
    const response = await axios.get('/api/cupcakes');
    const cupcakes = response.data.cupcakes;
    for(const cupcake of cupcakes){
        displayCupcake(cupcake);
    }

}

$(document).ready(async function() {
    console.log( "cupcake script ready!" );
    onlyShow($allCupcakes);
    await getCupcakes();

});

$("#cupcakes-display").click(
    function(e){
        const target = e.target;
        const tId = target.id;
        const action = tId.slice(0,3);
        const cupcake_id = tId.slice(3);
        switch(action){
            case 'det':
                console.log('det');
                displayCupcakeDetails(cupcake_id);
                break;
            case 'edt':
                console.log('edt');
                editCupcake(cupcake_id);
                break;
            case 'del':
                console.log('del');
                deleteCupcake(cupcake_id);
                break;
            default:
                break;

        }
    }
);

$('#add-cupcake-button').click(function(e){
    onlyShow($addCupcake);
});

$('#submit-added-button').click(async function(e){
    const submittedValues = {image:    $('#cupcake-image-edit').val(),
                             flavor:   $('#cupcake-flavor-edit').val(),
                             size:     $('#cupcake-size-edit').val(),
                             rating:   $('#cupcake-rating-edit').val()};    
    const json = JSON.stringify(submittedValues);
    await axios.post('/api/cupcakes/',json);
});

