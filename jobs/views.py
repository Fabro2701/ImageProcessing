from django.shortcuts import render

# Create your views here.
def home(request):
    if request.method == 'POST':
        print(request.POST)
        return render(request, 'jobs/home.html')
    else:
        return render(request, 'jobs/home.html')