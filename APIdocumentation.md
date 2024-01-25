# API Documentation

## Topics

- ### GET /topics

It allows you to get a list of the data of all the topics.

Endpoint URL

[http://127.0.0.1:8080/topics](http://127.0.0.1:8080/topics)

Example response:

[

    {

        title "Maths",

        desc: "This is a flashcard set for Maths",

        numFlashcards: 15

    },

    {

        title: "Computer Science",

        desc: "This is a flashcard set for Computer Science",

        numFlashcards: 24

    },

    {

        title: "Physics",

        desc: "This is a flashcard set for Physics",

        numFlashcards: 72

    }

]

- ### GET /topic

It allows you to get the data of a topic.

Endpoint URL

[http://127.0.0.1:8080/topic](http://127.0.0.1:8080/topic)

Query

| Name | Type | Description |
| --- | --- | --- |
| title | text | The name of the topic you want to get |

Example response:

{

    title "Maths",

    desc: "This is a flashcard set for Maths",

    numFlashcards: 15

}

- ### POST /topic/new

Allows you to add a new topic.

Endpoint URL

[http://127.0.0.1:8080/topic/new](http://127.0.0.1:8080/topic/new)

JSON body parameters

| Name | Type | Description |
| --- | --- | --- |
| new-title | text | The name of the topic that you want to add. |
| new-desc | text | The text of the description you want to add |

## Flashcards

- ### GET /flashcards

Allows you to get a list of all the flashcards for a topic.

Endpoint URL:

[http://127.0.0.1/flashcards](http://127.0.0.1/flashcards)

Query

| Name | Type | Description |
| --- | --- | --- |
| title | text | The title of the flashcards you want to get. |

Example response:

[

    {

        "question": "What is 1 + 1?",

        "answer": "1 + 1 = 2"

    },
    {

        "question": "What is 1 x 1?",

        "answer": "1 x 1 = 1"

    }

]

- ### GET /flashcard

Allows you to get a single flashcard for a topic.

Endpoint URL:

[http://127.0.0.1/flashcard](http://127.0.0.1/flashcard)

Query

| Name | Type | Description |
| --- | --- | --- |
| title | text | The title of the flashcard you want to get. |
| index | integer | The index of the flashcard you want to get. (starts from 0). |

Example response

{

    "question": "What is 1 + 1?",

    "answer": "1 + 1 = 2"

}

-
### POST /flashcard/new

Allows you to add a new flashcard.

Endpoint URL:

[http://127.0.0.1/flashcard/new](http://127.0.0.1/flashcard/new)

JSON body parameters

| Name | Type | Description |
| --- | --- | --- |
| new-title | text | The title of the flashcard you want to add |
| question | text | The question you want to add |
| answer | text | The answer you want to add |