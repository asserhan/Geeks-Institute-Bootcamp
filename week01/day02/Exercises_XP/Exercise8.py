data = [
    {
        "question": "What is Baby Yoda's real name?",
        "answer": "Grogu"
    },
    {
        "question": "Where did Obi-Wan take Luke after his birth?",
        "answer": "Tatooine"
    },
    {
        "question": "What year did the first Star Wars movie come out?",
        "answer": "1977"
    },
    {
        "question": "Who built C-3PO?",
        "answer": "Anakin Skywalker"
    },
    {
        "question": "Anakin Skywalker grew up to be who?",
        "answer": "Darth Vader"
    },
    {
        "question": "What species is Chewbacca?",
        "answer": "Wookiee"
    }
]

def quiz():
    print("Welcome to the star war quiz\n")
    correct = 0
    wrong = 0
    wrong_answers = []
    for item in data:
        answer=input(item["question"] + "\n").strip()
        if(answer == item["answer"]):
            correct += 1
        else:
            wrong += 1
            wrong_answers.append(answer)
    print(f"Correct answers: {correct}")
    print(f"Wrong answers: {wrong}")
    print("Wrong answers are:")
    for i in wrong_answers:
        print(i)
    print("Thank you for playing the quiz")
quiz()