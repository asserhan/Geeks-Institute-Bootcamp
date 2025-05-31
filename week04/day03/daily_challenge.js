class Video{
    constructor(title,uploader,time){
        this.title = title;
        this.uploader = uploader;
        this.time = time; // in seconds
    }
    watch(){
        return console.log(`${this.uploader} watched all ${this.time} of ${this.title}`);
    }
}

const video1 = new Video("JavaScript Basics", "Alice", 300);
video1.watch();
const video2 = new Video("Advanced JavaScript", "Bob", 600);
video2.watch();

//bonus
const videos = [
    { title: "JavaScript Basics", uploader: "Alice", time: 300 },
    { title: "Advanced JavaScript", uploader: "Bob", time: 600 },
    { title: "JavaScript ES6 Features", uploader: "Charlie", time: 450 },
    { title: "Asynchronous JavaScript", uploader: "Diana", time: 500 },
    { title: "JavaScript Design Patterns", uploader: "Eve", time: 700 }
];
const videoInstances = videos.map(video => new Video(video.title, video.uploader, video.time));
videoInstances.forEach(video => video.watch());
// This creates an array of Video instances from the video data and calls the watch method on each instance.
// We use map to transform each object in the videos array into a Video instance, allowing us to utilize the methods defined in the Video class.



