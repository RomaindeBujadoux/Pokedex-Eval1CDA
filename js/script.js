$("#chercher").on("click", function () {

    fetch("https://pokeapi.co/api/v2/pokemon-species/" + $("#numPokemon").val())
        .then(response => response.json())
        .then(response => {
            // console.log(response);
            console.log(response.flavor_text_entries);

            const entrees = response.flavor_text_entries;

            const flavor_text_entries_fr = entrees.filter(entreeFr)
            function entreeFr(entree) {
                return entree.language.name == "fr";
            }
            console.log(flavor_text_entries_fr);

            const flavor_text_fr = []
            for (let i = 0; i < flavor_text_entries_fr.length; i++) {
                flavor_text_fr.push(flavor_text_entries_fr[i].flavor_text);
            }
            console.log(flavor_text_fr);

            function onlyUnique(value, index, array) {
                return array.indexOf(value) === index;
            }

            const unique_flavor_text_fr = flavor_text_fr.filter(onlyUnique);
            console.log(unique_flavor_text_fr);
            description1 = unique_flavor_text_fr[0].replace("\n", " ");
            description2 = unique_flavor_text_fr[1].replace("\n", " ");
            descripParagraphe = description1 + "<br/>" + description2;
            $("#description").html(descripParagraphe);

            $("#imgPokemon").attr("src", `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${$("#numPokemon").val()}.png`);
            
            
            

            $("#cadreReponse").css("border", `3px solid ${response.color.name}`);
            $("#NumTitreH2").html($("#numPokemon").val());
            $("#nomPokemon").html(response.names[4].name);
            $("#txCapture").html(response.capture_rate);
            $("#nomFamille").html(response.genera[3].genus);
        })
        .catch(error => {
            error = "Erreur dans votre requête AJAX !!!";
            console.log("Erreur : " + error)
        });

    // fetch("https://pokeapi.co/api/v2/pokemon/" + $("#numPokemon").val())
    //     .then(resp => resp.json())
    //     .then(resp => {
    //         console.log(resp);
    //         console.log(resp.sprites.other.official-artwork.front_default);
    //     })
    //     .catch(error => {
    //         error = "Erreur dans votre requête AJAX !!!";
    //         console.log("Erreur : " + error)
    //     });
});