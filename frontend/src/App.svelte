<script lang="ts">
  import { onMount } from 'svelte';

  let apiKey: string = '';
  let url: string = '';
  let boxIds : string[] = ["box1", "box2", "box3", "box4", "box5", "box6"];
  let titleIds : string[] = ["title1", "title2", "title3", "title4", "title5", "title6"];
  let descIds : string[] = ["desc1", "desc2", "desc3", "desc4", "desc5", "desc6"];
  let imgIds: string[] = ["img1", "img2", "img3", "img4", "img5", "img6"];
  let choosenArticles : number[] = [0, 2, 3, 8, 6, 7]; 



  onMount(async () => {
    try {
      
      const res = await fetch('/api/key');
      const dataApi = await res.json();
      apiKey = dataApi.apiKey;
      url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=Sacramento&api-key=" + apiKey; // added the apiKey that you recieve from the env + backend here 
      console.log(url); // double checking that this is correct 
      
      try{

        /*
         * Game Plan:
         * making an array with all the id names and everything for each article 
         * then looping throught them and adding the api info 
         * that's it 
         * will need to understand the images cause idk man 
         */
        const res2 = await fetch(url);
        const data = await res2.json();

        // all the current code here is just testing first article will need to change stuff to make it work for the whole thing follow the game plan 
        let first = data.response.docs[4].headline.main;  // how to access the main title h3 here :D
        let firstArticle = document.getElementById(boxIds[1]);
        let firstTitle = document.getElementById('title1');
        let descToPrint = document.getElementById(descIds[1]);
        let desc = data.response.docs[4].abstract;

        let images = data.response.docs[7].multimedia.default;
        let img = document.getElementById('image1') as HTMLImageElement;
     

        console.log(images.url);
        for (let i = 0; i<6; i++) { // come here 
            first = data.response.docs[choosenArticles[i]].headline.main;
            desc = data.response.docs[choosenArticles[i]].abstract;
            firstArticle = document.getElementById(boxIds[i]); // gets the div that contains the first article information 
            // console.log(firstArticle); 
            firstArticle?.addEventListener('click', () => {
                window.location.href = data.response.docs[choosenArticles[i]].web_url;
            });

            firstTitle = document.getElementById(titleIds[i]); // this is where the header is 
            if (firstTitle) { // ts is being a mean so i needed to check that it wasn't null 
             firstTitle.innerText = first; // inserting the api json title here 
            } 
            descToPrint = document.getElementById(descIds[i]);
            if(descToPrint){
                descToPrint.innerText = desc; 
            }
            images = data.response.docs[choosenArticles[i]].multimedia.default;
            let img = document.getElementById(imgIds[i]) as HTMLImageElement; // used helped from stackoverflow here 
            if(img){
            img.src = images.url; 
            }
        }
        // console.log(first);

        console.log(data); // testing here 
       // checking 
     
        // needed help understanding now to make the whole div clickable here 
      
        
      } catch(error){
        console.error('Failed to fetch article info', error); // error message if something wrong happens with fetching the article 
      }

    } catch (error) {
      console.error('Failed to fetch API key:', error);
    }
  });


 
</script>

  <section class="main">
    <header> 
        <!-- This is where all the header stuff is like title and date  -->
        <div class="date">
            <p id="currentDate"></p>
            <script>
                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
                const date = new Date().toString();
                const extracted = date.slice(0, 16);
                document.getElementById("currentDate").innerHTML = extracted;
            </script>
            <p>Today's Paper</p>
        </div>
        <h1>The NewYork Times</h1>
    </header>
   
    <section class="secondHeader">
        <!-- This section is to represent NavBar -->
        <div class="navbar">
            <a href="#us">U.S. </a>
            <a href="#world">World </a>
            <a href="#business">Business </a>
            <a href="#arts">Arts </a>
            <a href="#lifestyle">Lifestyle </a>
            <a href="#opinion">Opinion </a>
            <div class="vert"></div>
            <a href="#audio">Audio </a>
            <a href="#games">Games </a>
            <a href="#cooking">Cooking </a>
            <a href="#wirecutter">Wirecutter </a>
            <a href="#athletic">Athletic </a>
        </div>
        <hr class="bold">
        <hr class="bold">
        <div class="live">
            <p >LIVE</p>
            <a href="#audio">Boba </a>
            <p class="time">9h ago</p>
            <a href="#Matcha">Matcha </a>
            <p class="time">1h ago</p>
            <a href="#audio">Coffee </a>
            <p class="time">2h ago</p>
        </div>
    </section>
    <hr class="bold">
    
    <!-- Here is where the main body takes place -->
   <div class="body">
    <!-- Split into 3 different columns, the first and second is for the ipad view -->
        <div class="firstColumn" id="box1">
            <div class="second">
                <hr class="special1">
                <h3 class="title1" id="title1"></h3>
                <div class="icecream">
                    <img src="" alt="FirstImage" id="img1">
                </div>
                <p id="desc1"></p>
                <p class="time">6 MIN READ</p>
            </div>
        </div>

        <div class="secondColumn" id="box2">
            <div class="first">
                <img src="" alt="offBeat" id="img2">
                <h3 class="title1" id="title2"></h3>
                <p id="desc2"></p>
                <p class="time">1000 MIN READ</p> 
            
            </div>    
        </div>

        <div  class="thirdColumn" id="box3">
            <div class="first">
                <hr class="special">
                <h3 class="title1" id="title3"></h3>
                <img src="" alt="offBeat" id="img3">
                <p id="desc3"> </p>
                <p class="time">23 MIN READ</p>
            </div>
        </div>

        <div class="firstColumn" id="box4">
            <div class="second">
                <hr>
                <h3 class="title1" id="title4"></h3>
                <img src="mai.png" alt="offBeat" id="img4">
                <p id="desc4"></p>
                <p class="time">96 MIN READ</p>
               
            </div>
          
        </div>
        <div  class="firstColumn" id="box5">
            <div class="first">
                <hr>
                <h3 class="title1" id="title5"></h3>
                <div class="mala">
                    <img src="" alt="mala" id="img5">
                </div>
                <p id="desc5"> </p>
                <p class="time">6 MIN READ</p>
            </div>   
        </div>
        <div  class="thirdColumn" id="box6">
            <div class="second">
                <hr>
                <h3 class="title1" id="title6"></h3>
                <img src="mai.png" alt="offBeat" id="img6">
                <p id="desc6"> </p>
                <p class="time">19 MIN READ</p>
            </div>  
        </div>
   </div>
   <!-- <p>
    Your API Key: <strong>{apiKey}</strong>
  </p> -->

</section>

