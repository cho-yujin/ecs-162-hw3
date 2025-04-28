<script lang="ts">
  import { onMount } from 'svelte';
  import svelteLogo from './assets/svelte.svg';
  import viteLogo from '/vite.svg';
  import Counter from './lib/Counter.svelte';

  let apiKey: string = '';
  let url: string = '';

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
        const first = data.response.docs[4].headline.main;  // how to access the main title h3 here :D
        // console.log(first);

        console.log(data); // testing here 
        let firstArticle = document.getElementById('firstColumn'); // gets the div that contains the first article information 
        console.log(firstArticle); // checking 
        const firstTitle = document.getElementById('title1'); // this is where the header is 

        if (firstTitle) { // ts is being a mean so i needed to check that it wasn't null 
          firstTitle.innerText = first; // inserting the api json title here 
        } 
        // needed help understanding now to make the whole div clickable here 
        firstArticle?.addEventListener('click', () => {
          window.location.href = data.response.docs[4].web_url;
        });
        
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
        <div class="firstColumn" id="firstColumn">
            <div class="second">
                <hr class="special1">
                <h3 class="title1" id="title1">Sesame Yuzu Ice Cream Made Everyone Additicted</h3>
                <a id="link1"></a>
                <div class="icecream">
                    <img src="icecream.png" alt="mala">
                </div>
                <p>  The ice cream had a lot of black sesame syrup that tasted very delicious! The Yuzu flavor was also very prominent. Highly recommend this place @ Seattle. Go check it out!!</p>
                <p class="time">6 MIN READ</p>
            </div>
        </div>

        <div  class="secondColumn">
            <div class="first">
                <img src="littleHuman.png" alt="offBeat">
                <h3 class="title1">Did the Little Human Conqure or Befriend the Giant Troll?</h3>
                <p>For years now the troll has been terrorizing all the people of small town of Seattle, but that was until the little human from Cupertino came...</p>
                <p class="time">1000 MIN READ</p> 
            
            </div>    
        </div>

        <div  class="thirdColumn">
            <div class="first">
                <hr class="special">
                <h3 class="title1">The Hottest Banana Pudding Matcha @ OffBeat Coffee</h3>
                <img src="offBeat.PNG" alt="offBeat">
                <p>So light, so creamy, and so delicious. Go to Sacramento now for the limited time it's available on the weekends :D Make sure to go support them, their window got broken into for the second time :,, On Saturday a pop-up with really good bakery items shows up, so GO. </p>
                <p class="time">23 MIN READ</p>
            </div>
        </div>

        <div class="firstColumn">
            <div class="second">
                <hr>
                <h3 class="title2">A Young Adult's Sleep: A Rant</h3>
                <p>I know I should be sleeping earlier so I don't miss my 162 class but sometimes I do work all day and suddenly it's 3am and I am playing Stardue Valley :D</p>
                <p class="time">96 MIN READ</p>
                <hr>
                <h3 class="title2">Home Oh Sweet Home</h3>
                <p>I have been on campus for way too long and now I really want to be at home, but I still have classes and a club meeting. I need to finish all my hw due, but this is so annoying just want to be in bed.</p>
                <p class="time">800009 MIN READ</p>
                <hr>
                <h3 class="title2">YFG Malatang</h3>
                <p>When I went to go finish my friends in Seattle I got to try YFG Malatang and now I am really craving it but the closest location is in Dublin which is so sad. Wish we had one in Davis too. </p>
                <p class="time">69 MIN READ</p>
            </div>
          
        </div>
        <div  class="firstColumn">
            <div class="first">
                <hr>
                <h3 class="title1">Little Kitty Wants My Soup</h3>
                <div class="mala">
                    <img src="cat.JPG" alt="mala">
                </div>
                <p>I just want to drink my soup, but this little kitten wants to drink it too. I gave her food but she wants MY soup. I love her sooo much however I am not giving up my soup. </p>
                <p class="time">6 MIN READ</p>
            </div>   
        </div>
        <div  class="thirdColumn">
            <div class="second">
                <hr>
                <h3 class="title1">New Matcha Pop-Up at Davis</h3>
                <img src="mai.png" alt="offBeat">
                <p>Not too sweet but not too bitter. I got to see the matcha being made infront of me, and it was whished very well, with no clumps. I really enjoyed it, would comeback for the next pop-up on April 26th. I really want to try the matcha with jasmine syrup. </p>
                <p class="time">19 MIN READ</p>
            </div>  
        </div>
   </div>
   <p>
    Your API Key: <strong>{apiKey}</strong>
  </p>

</section>

