import requests
from Error import CustomError
import datetime
import re

#GITHUB Repository URL pattern
pat=re.compile("^https://github.com/[\.\w-]+/[\.\w-]+$")

#GIT API URL
API_BASE_URL="https://api.github.com/repos/"

def getGitRepoIssueCounts(inputJSON):
    """
    :param inputJSON:
    :return:Dictionary containing open issue counts
    """
    gitURL=inputJSON.get("git_url","")

    # Checking for empty input
    if not gitURL:
        raise CustomError("Please Specify All Inputs",status_code=400)
    # Checking if the url matches the git repository url pattern
    if not pat.match(gitURL):
        raise CustomError("Invalid Git URL")
    # Splitting url to get username and reponame
    username,reponame=gitURL.split("/")[-2:]
    # Forming the GIT API URL
    gitIssueURL=API_BASE_URL+username+"/"+reponame+"/issues"
    response=requests.get(gitIssueURL)
    # Checking If we got a valid response
    if response.status_code!=200:
        raise CustomError("Oops Something Went Wrong. Please try again later")
    #Extracting JSON from response
    results=response.json()
    outputDict=parseResultAndGetIssueCounts(results)
    return outputDict


def parseResultAndGetIssueCounts(results):
    """
    :param results:
    :return: dictionary issue duration and their counts
    """


    if not results:
        return {}
    issueCounts={}
    # Setting Defaults
    issueCounts['Last 24 hours']=0
    issueCounts['Between last 24 hours and last 7 days']=0
    issueCounts['More than 7 days ago']=0

    for result in results:
        # Checking for open issues
        if result['state']=="open":
            #Converting created_at field of result to python datetime
            created_at=datetime.datetime.strptime(result['created_at'],'%Y-%m-%dT%H:%M:%SZ')
            #Current Datetime
            now=datetime.datetime.now()
            #Difference between current datetime and created_on datetime
            diff=now-created_at
            if  diff< datetime.timedelta(hours=24):
                issueCounts['Last 24 hours']+=1
            elif diff>datetime.timedelta(hours=24) and diff<datetime.timedelta(days=7):
                issueCounts['Between last 24 hours and last 7 days']+=1
            else:
                  issueCounts['More than 7 days ago']+=1
    return issueCounts














