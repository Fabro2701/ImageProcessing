import json

from django.shortcuts import render

# Create your views here.
def home(request):
    if request.method == 'POST':
        post = json.load(request)
        print(post['connections'])
        print(post['forms'])

    return render(request, 'canvas/home.html')