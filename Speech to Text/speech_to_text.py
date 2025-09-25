import speech_recognition as sr
import pyttsx3

r = sr.Recognizer()

def record_text():

    with sr.Microphone() as source2:
        r.adjust_for_ambient_noise(source2, duration=0.2)
        try:
            audio2 = r.listen(source2)

            MyText = r.recognize_google(audio2)

            return MyText.lower()

        except sr.RequestError as e:
            print("Could not request results; {0}".format(e))
            return

        except sr.UnknownValueError:
            print("Unknown error occured")
            return
    return

def output_text(text):
    if text.strip() == "":
        return  # skip empty text
    with open("output.txt", "a") as f:
        f.write(text + "\n")

try:
    while(1):
        text = record_text()
        if not text:
            continue
        if text in ["terminate"]:
            print("Stop command received. Exiting")
            break
        output_text(text)
        print("Wrote Text",text)
except KeyboardInterrupt:
    print("\nExiting program via Ctrl+C.")

import os
if os.path.exists("output.txt"):
    os.remove("output.txt")
    print("output.txt deleted")