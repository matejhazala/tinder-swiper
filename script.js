// filter values for "dislike" / "like with and logic" / "like with or logic", in that order:
var nopeValues = ["Smoker", 'Social smoker']; // dislike if one of values is found, has priority before like
var likeValues = []; // like if all/any values are found according to selected logic below
var likeLogic = "and"; // "and" to like if all likeValues are found / "or" to like if any of LikeValues is found

findButton = function(searchText){
        var tags = document.getElementsByTagName("span");
        var button;

        for (var i = 0; i < tags.length; i++) {
          if (tags[i].textContent == searchText) {
            button = tags[i].closest('button');
            break;
          }
        }

        //console.log(searchText);
        //console.log(button);
        return button;
    }

swipe = function(){
    console.log('SWIPE');
    setTimeout(() => {
        // name
        var name = document.getElementsByClassName("Ov(h) Ws(nw) Ell")[1].children[0].textContent; //name of tinder profiles
        console.log(name);

        // open profile details
        openProfile = findButton('Open Profile');
        if (openProfile) {
            openProfile.click();
        }

        setTimeout(() => {
            // find like/dislike buttons
            var likeButton = findButton('Like');
            var nopeButton = findButton('Nope');

            // trigger auto swipe after like/dislike
            likeButton.addEventListener("click", swipe);
            nopeButton.addEventListener("click", swipe);

            var whatNope;
            var whatLike = [];
            var nope = false;
            var like = false;
            var likeAnd = [];


            var h2Elements = Array.prototype.slice.call(document.querySelectorAll("h2"));
            //console.log(h2Elements);

            var sections = ["Basics", "Lifestyle"];
            for (section of sections) {
                //console.log(section);
                var sectionElement;

                for (let element of h2Elements){
                    //console.log(element);
                    if (element.textContent == section){
                        sectionElement = element.closest("div");

                        for (nopeValue of nopeValues){
                            //console.log(nopeValue);
                            if (sectionElement.innerHTML.indexOf(nopeValue) !== -1){
                                whatNope = nopeValue;
                                nope = true;
                                break;
                            }
                        }

                        for (likeValue of likeValues){
                            //console.log(likeValue);
                            if (sectionElement.innerHTML.indexOf(likeValue) !== -1){
                                whatLike.push(likeValue);
                            }
                        }
                    }
                }
            }

            if ((whatLike.legth > 0) && ((likeLogic === "and" && likeValues.length === whatLike.length) || (likeLogic === "or"))) {
                like = true;
            }

            //console.log('Nope' + nope);
            if (nope) {
                console.log('Dislike ' + name + ' ' + whatNope);
                nopeButton.click();
            } else if (like) {
                console.log('Like ' + name + ' ' + whatLike);
                likeButton.click();
            }

        }, 500);
    }, 500);
}

// find like/dislike buttons
var likeButton = findButton('Like');
var nopeButton = findButton('Nope');

// trigger auto swipe after like/dislike
likeButton.addEventListener("click", swipe);
nopeButton.addEventListener("click", swipe);
