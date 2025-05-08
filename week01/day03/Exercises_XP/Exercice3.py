class Song():
    # lyrics of the song as list
    def __init__(self, lyrics):
        self.lyrics = lyrics
    
    def sing_me_a_song(self):
        for i in range(len(self.lyrics)):
            print(f"{self.lyrics[i]}\n")


stairway = Song(["There’s a lady who's sure", "all that glitters is gold", "and she’s buying a stairway to heaven"])
stairway.sing_me_a_song()