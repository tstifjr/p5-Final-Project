import random
import math

class Score:
    all = []
    def __init__(self, home_score, away_score, clock):
        self.home_score = home_score
        self.away_score = away_score
        self.clock = clock
        Score.all.append(self)
    
    def __repr__(self):
        return f"<Time Remaining: {self.clock}, Home: {self.home_score}, Away: {self.away_score}>"
    

def half_sim(h=0, a=0, t=20):
    l = random.randint(22,25)
    tr = t
    for i in range(l):
        tr = tr - (t/l)
        tuple = math.modf(tr)
        clock = f'{int(tuple[1])}:{round(tuple[0] * 60)}'
        h+= random.randint(0,3)
        a+= random.randint(0,3)
        Score(h, a, clock) 

    print(Score.all[-1])
    return(Score.all[-1])

at_half = half_sim()
final = half_sim(at_half.home_score, at_half.away_score)
