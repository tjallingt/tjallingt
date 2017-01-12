+++
title = "tjube.ninja"
description = "A party video player made with React.js"
date = "2017-01-07T16:52:33+01:00"
image = "/images/tjube.jpg"
draft = true
+++

## 1 – INTRODUCTION
This paper discusses the creative process of realizing a video player that allows users to add videos to a playlist using their mobile phone from now on referred to as a “party” video players. Party video players are not a well-defined concept, therefore it is important to state what this concept will entail in the context of this paper. As stated previously party video players are video players that will allow users to add videos to a playlist of videos, usually of YouTube videos. These videos will automatically be played on a public screen. Users of a party video player are able to add videos using their own devices. The most common use case for such a player is that the host of a party will setup a party video player and the guests will add songs or videos that they want to hear, watch or show. 

### 1.1 – Problem description/Related work
There are only two options known for people who want to use a party video player. These two options are ProTube and YouTube TV. First this project attempts to analyse what aspects of the user experience of both these applications works well and which aspects can be improved on. After identifying these aspects it is possible to formulate goals, a research question and ideate several potential solutions that will achieve these goals. These analyses were done by using both applications with a small group of users and then discussing the various aspects of the user experience afterwards.

#### 1.1.1 – ProTube 
{{< figure src="./protube.PNG" caption="ProTube home screen" >}}
The first party video player that is analysed is ProTube; if a user wants to use ProTube to display videos they can go to the ProTube website and open a public and a private screen. The public screen displays the video and playlist to everyone. The private screen allows the administrator to control the settings of the public screen such as edit the playlist and customize the appearance of the display. Other users can add their videos to the playlist by visiting a URL that is displayed on the public screen both in plain text and as a QR code.
Although ProTube offers a large range of options to users it also suffers from some problems. The administrator of the display will need to keep two screens open at all times. This might not seem like an issue but if you close the private screen and don’t remember the URL to reopen it, you lose access. This is because the private screen URL contains a secret token that prevents random users from accessing the private screen and tampering with the public screen. 
ProTube’s public screen could make better use of its screen real estate. The video which is the main focus of the public screen occupies roughly 60% of the screen whereas the playlist and the QR code take up most of the remaining space on the screen. Although QR codes can be an effective way to help users open webpages scanning them requires that the users have a QR code scanner installed on their device.
Lastly, ProTube occasionally suffers from bugs and performance issues, an example is a bug that causes videos to be added in the middle of the playlist instead of at the end. Because ProTube is not open-source and has now been abandoned by its author these problems will most likely not be fixed.

#### 1.1.2 – YouTube TV 
{{< figure src="./youtubetv.PNG" caption="YouTube TV home screen" >}}
The second analysed party video player is YouTube TV; YouTube TV is a web app that is preinstalled on many smart TV’s and home media systems however it is also accessible on other devices over the internet. The application is designed to be a full featured version of YouTube optimized for usage without a mouse.
Other users can pair their devices with the public screen in a variety of ways; If YouTube TV is installed on a home media system it will allow users with the YouTube smartphone app to connect with a single button press. However if YouTube TV is operated from the web or a user doesn’t have the YouTube smartphone app installed they will have to enter a pair code that can only be found in the settings menu of the public screen.
YouTube TV gives all paired users the ability to fully control the playlist and video. This means they can add videos, remove videos, skip videos and control the video playback. While this control is appreciated when with smaller groups of people this can cause a lot of grievances when there are a lot of people paired with YouTube TV. 

### 1.2 – Project goals
Now that the problems in the current situation have been analysed it is possible to set some goals that this project tries to achieve. The design concept of the party video player this project aims to create should fulfil these goals:

* Improve on ProTube by simplifying the administrator experience and redesigning the public screen. 
* Improve on YouTube TV by reducing its complexity in order to improve the user experience.
* Learn to improve on an existing application and gain more experience programming in JavaScript.

## 2 – IDEATION AND SPECIFICATION
Now that I have defined the goals for this project it is possible to ideate and specify requirements. These requirements will be functions and behaviours that this project has to implement to be useful as a party video player and to achieve its goals of improving on the existing applications.

### 2.1 – Functional requirements
To be able to improve on existing party video players I first specified the functional requirements for a minimum viable product. The functional requirements of a minimum viable party video player are:

* It can display videos
* It should display the video title
   * It has playlist of videos
* These videos will automatically be played
   * Its administrator has control over the public screen
* The administrator can skip a video
* The administrator can scrub through a video
   * Its other users can use devices to add videos to the playlist
   *It supports multiple groups of users

### 2.2 – Prototype concept
With these functional requirements a very basic prototype can be made. I used this prototype as a basis to test my ideas. I tested and ideated using user participatory design which means that I got (a small amount of) users to test a prototype and suggest changes. Then I used the user feedback to create a new version of the prototype to repeat this process with. Throughout this process I also contributed my own ideas which I then discussed with users.
One of the ideas I wanted to test is to remove the private screen and have the administrator only open a single screen just like with YouTube TV. I thought this would be an improvement over ProTube as this change likely will reduce complexity and make it easier to setup this party video player. 
Unlike YouTube TV I didn’t want to give users full access to the playlist therefore I chose to allow the administrator to make changes to the playlist directly on the public screen whereas other users can only add videos using a remote that they can access on any device.

## 3 – REALISATION
To realize the prototype I will mainly use JavaScript. JQuery  was used on the front-end and Node.js  was used to implement the back-end. JQuery is a JavaScript library that can speed up front-end development by making it very easy to implement all sorts of user experience features. Node.js can be used to implement the back-end server logic with JavaScript. The communication between the front-end and the back-end is realized using Socket.io, a JavaScript library that simplifies real-time web sockets communication between the browser and the server.

{{< figure src="./Diagram.png" caption="Application overview" >}}
I started building my prototype by implementing the YouTube Iframe API  that allows developers to embed YouTube videos on a webpage and respond to certain player events such as the ending of a video. After getting a video player working on the page, I created the playlist. The playlist data was stored on the page itself as a HTML list containing elements whose ids matched the ids of the YouTube videos. Whenever a video ended the first element in the list was selected, its id was used to start the correct video and the element was removed from the page.
Now that the simple playlist worked I started to work on adding videos to the playlist; using the YouTube Data API  Search: list it was easy to implement a search bar that allows users to find videos which could then be stored in the playlist when the user selected one of the search results. 
I separated out the search logic and placed it on its own page which allowed me to make a simple remote for the public screen. As mentioned before I setup communication between the remote and the public screen using Socket.io. 
This early prototype of the party video player could be used to gather early feedback from users regarding to the operation of the public screen. From this early feedback it became apparent that I needed to implement features that would make managing the playlist easy. The features users expected from this prototype were sorting the playlist and removing videos from the playlist. Another concern among the early users was that the playlist and search features on the public screen would take up too much space leaving very little room for the most important feature, the video player. Users did not seem to mind the lack of ProTube’s private screen which seemed to indicate that my concept could work.

{{< figure src="./Diagram2.png" caption="Early design concept" >}}
As the basic features were now implemented I started working on the design of the screen. I started by allocating most of the space on the page for the video and having a small strip next to the video for the playlist and search bar. This worked quite well but still used up a lot of space as the titles of most videos are multiple words long. After pondering about this for a while I realized that the most basic use of the playlist was to be able to see what video would play next. This realization led me to the idea of adding a subtitle below the title of the currently playing video. This subtitle would show users what video would play next allowing me to shrink the playlist down.

{{< figure src="./Diagram3.png" caption="Final design concept" >}}
Users indicated that they did want to see the playlist however and the administrator needs access to the playlist to be able to edit it. My solution was to overlay the playlist over the video, fading it out and shrinking it down when not in use. This way users could keep track of the play list without it taking up much space and when needed the administrator could access the playlist.
The design for the public screen was finalized so I added more detailed features: I disabled the YouTube’s default video controls because they were hard to use with the playlist overlapping them so I had to add a custom progress bar I also added drag and drop sorting to the playlist for quick and intuitive administration.

## 4 – EVALUATION
As explained before this project made use of participatory design which means that at every step users were asked to evaluate the state of the project and pitch in ideas for improvements. However the purpose of these intermediate evaluations was to get feedback on different aspects of the design and functionality. This leaves the question whether or not the prototype fulfils the original goal this project set out to achieve. This section discusses if the prototype achieves its original goals, this data was obtained by allowing users to test the final prototype. The users that participated in these tests had experience using both ProTube and YouTube TV but did not test this prototype before.

Improve on ProTube by simplifying the administrator experience and redesigning the public screen. 
As I removed the private screen the administrator experience became much more in line with the regular user experience. Users experienced the administrative experience as intuitive since they have access to all the required tools right on the public screen. The first experience with the public screen users have to take a little time to find out how to add the videos but since I added on screen text explaining it most users catch on relatively quickly. Administrating the playlist is also a task the users struggle with the first time they are tasked with it, once they hover over the playlist and see it open up most of its interactions (drag and drop, click the x button to remove) are quickly understood.
User feedback indicated that the design of the prototype’s public screen when compared to ProTube was much more pleasing. The reason users say that the design is much better is because they feel like there is less wasted space and they appreciate that the video takes up all of the available space.

Improve on YouTube TV by reducing its complexity in order to improve the user experience.
The users that had experience with YouTube TV used it on a home media system together with the YouTube smartphone app, they indicated the ease with which these apps worked together was what made them like YouTube TV so much. They did mentioned they had problems before with people messing with a playlist or changing the volume while using YouTube TV but indicated that they thought that these features in general were a very useful part of YouTube TV. These factors made them prefer YouTube TV over my prototype. However when I asked these users if they had any experience using YouTube TV without a home media system they said that they didn’t know that was possible. After I showed them how to open YouTube TV in a web browser and how to pair devices with it they indicated that they preferred my prototype over YouTube TV when it is not available on a home media system. 


Learn to improve on an existing application and gain more experience programming in JavaScript.
I started this project because I had used ProTube before and recognized that it could be improved upon. I wanted to find out whether it was possible for me to create an application like ProTube and improve on it in the way I imagined. These are hard goals to evaluate but I think I succeeded seeing as users indicate that my prototype is usable and is an improvement on ProTube. 
Since I did make the prototype with JavaScript I did gain more experience with it but since JQuery and its plugins simplify a great deal of the code I did not gain that much experience. The prototype also ended up being hard to add features to. This was no big deal for the prototype but did make me rewrite the prototype in order to fix these issues. I will discuss this rewrite in the next section.
The full code of the prototype can be found here: https://github.com/tjallingt/tjube.ninja 

## 5 – FINALIZING
After the prototype had been tested I noticed some problems with the way it had been build. The prototype was not sustainable for future development. It was hard to change existing functionality and even harder to add new functionality. These problems stemmed from the method that I originally started working, just creating a HTML file in which I also put my CSS and JavaScript. I came to this realization when I noticed a small bug in the search functionality. I fixed the bug on the public screen and thought I was done until a few days later I noticed the bug was still there. As it turned out I had forgotten to fix the bug on the remote, which was a separate HTML file with completely separate code even though it was doing almost exactly the same thing.
At the time I also attended a small JavaScript developer gathering where they discussed a JavaScript framework called React . This framework allowed a developer to create custom components that could be used like HTML components. After learning more about React and comparing it with other JavaScript frameworks, I decided to create a production version of my prototype using React.
This rewrite of the prototype allowed me to focus on code quality and maintainability while rebuilding all the features of the prototype. This also taught me how to maintain a project with git and how to write correct and readable code, specifically JavaScript. For example the use of code “linting” to check for errors before you run the code and make sure code style is consistent. 
The full code for the React rewrite can be found here: https://github.com/tjallingt/react-tjube 
The application can be found online here: https://tjube.ninja/ 
