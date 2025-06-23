//Fonction récupérant les entrées en langage fr
function entreeFr(entree) {
    return entree.language.name == "fr";
}

//Garder que les valeurs unique d'un tableau
function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
}

$("#chercher").on("click", function () {
    if ($("#numPokemon").val() <= 0 || $("#numPokemon").val() > 898 ) {
        alert("Veuillez saisir un Id compris entre 1 et 898 inclus");
    } else {
        fetch("https://pokeapi.co/api/v2/pokemon-species/" + $("#numPokemon").val())
            .then(response => response.json())
            .then(response => {
                $("#containerReponse").css("visibility", "visible");
                
                //Passer la couleur du cadre à la couleur du pokemon sélectionné
                $("#cadreReponse").css("border", `3px solid ${response.color.name}`);

                //Récupération des différentes informations du pokemon sélectionné
                $("#NumTitreH2").html($("#numPokemon").val());
                $("#nomPokemon").html(response.names[4].name);
                $("#txCapture").html(response.capture_rate);
                $("#nomFamille").html(response.genera[3].genus);

                //Récupération des objets textes de description du pokemon selectionné
                const entrees = response.flavor_text_entries;
                //On filtre que les objets textes de description en français
                const flavor_text_entries_fr = entrees.filter(entreeFr)

                //On crée un tableau regroupant que les textes de descriptions en fr
                const flavor_text_fr = []
                for (let i = 0; i < flavor_text_entries_fr.length; i++) {
                    flavor_text_fr.push(flavor_text_entries_fr[i].flavor_text.replace("\n", " "));
                }

                //On reformate chaque texte afin d'enlever les sauts de ligne /n
                //Une même phrase sur 2 versions pouvant avoir des sauts de ligne différents (ex:Carapuce Id:7)
                flavor_text_fr_reformat = []
                for (let i = 0; i < flavor_text_fr.length; i++) {
                    flavor_text_fr_reformat.push(flavor_text_fr[i].replace("\n", " "));
                }
                
                //Une fois chaque phrase nettoyer de ces sauts de ligne, 
                //on peut refaire un tableau avec des valeurs uniques
                const unique_flavor_text_fr = flavor_text_fr_reformat.filter(onlyUnique);
                
                //On crée un paragraphe de description avec deux phrases différentes de 2 versions
                //puis on l'affiche
                descripParagraphe = unique_flavor_text_fr[0] + "<br/>" + unique_flavor_text_fr[1];
                $("#description").html(descripParagraphe);

                //Affichage de l'image du pokemon
                $("#imgPokemon").attr("src", `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${$("#numPokemon").val()}.png`);
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
    }
        


    
});