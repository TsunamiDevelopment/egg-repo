import requests
import json

def get_vanilla_versions():
    # Make the API request
    url = "https://versions.mcjars.app/api/v1/builds/vanilla"
    response = requests.get(url)
    
    if response.status_code != 200:
        print(f"Error: API request failed with status code {response.status_code}")
        return None
    
    data = response.json()
    
    if not data.get("success", False):
        print("Error: API response indicates failure")
        return None
    
    # Process the versions data
    versions_data = {}
    for version_number, version_info in data.get("versions", {}).items():
        latest_build = version_info.get("latest", {})
        versions_data[version_number] = {
            "type": version_info.get("type", "SNAPSHOT"),
            "java" : version_info.get("java", "8"),
            "supported": version_info.get("supported", False),
            "experimental": latest_build.get("experimental", False)
        }
    
    return versions_data

def write_version_file(data, filename="versions.json"):
    with open(filename, "w") as f:
        json.dump({"versions": data}, f, indent=2)
    print(f"Version data written to {filename}")

if __name__ == "__main__":
    versions = get_vanilla_versions()
    if versions:
        write_version_file(versions)