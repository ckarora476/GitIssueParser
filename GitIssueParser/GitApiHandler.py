import requests
from Error import CustomError
import datetime
import re

# https://github.com/python/pythondotorg

pat=re.compile("^https://github.com/[\.\w-]+/[\.\w-]+$")

API_BASE_URL="https://api.github.com/repos/"

def getGitRepoIssueCounts(inputJSON):
    gitURL=inputJSON.get("git_url","")
    if not gitURL:
        raise CustomError("Please Specify All Inputs",status_code=400)
    if not pat.match(gitURL):
        raise CustomError("Invalid Git URL")
    username,reponame=gitURL.split("/")[-2:]
    gitIssueURL=API_BASE_URL+username+"/"+reponame+"/issues"
    response=requests.get(gitIssueURL)
    if response.status_code!=200:
        raise CustomError("Oops Something Went Wrong. Please try again later")
    results=response.json()
    outputDict=parseResultAndGetIssueCounts(results)
    return outputDict


def parseResultAndGetIssueCounts(results):
    if not results:
        return {}
    issueCounts={}
    issueCounts['Last 24 hours']=0
    issueCounts['Between last 24 hours and last 7 days']=0
    issueCounts['More than 7 days ago']=0
    for result in results:
        if result['state']=="open":
            created_at=datetime.datetime.strptime(result['created_at'],'%Y-%m-%dT%H:%M:%SZ')
            now=datetime.datetime.now()
            diff=now-created_at
            if  diff< datetime.timedelta(hours=24):
                issueCounts['Last 24 hours']+=1
            elif diff>datetime.timedelta(hours=24) and diff<datetime.timedelta(days=7):
                issueCounts['Between last 24 hours and last 7 days']+=1
            else:
                  issueCounts['More than 7 days ago']+=1
    return issueCounts














