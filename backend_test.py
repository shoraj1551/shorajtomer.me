#!/usr/bin/env python3
"""
Backend API Testing Suite for Shoraj Tomer Portfolio Website
Tests all backend endpoints and Stripe payment integration
"""

import requests
import json
import time
import os
from datetime import datetime

# Get backend URL from frontend .env file
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except Exception as e:
        print(f"Error reading frontend .env: {e}")
    return None

BACKEND_URL = get_backend_url()
if not BACKEND_URL:
    print("ERROR: Could not get REACT_APP_BACKEND_URL from frontend/.env")
    exit(1)

print(f"Testing backend at: {BACKEND_URL}")

class BackendTester:
    def __init__(self, base_url):
        self.base_url = base_url.rstrip('/')
        self.session = requests.Session()
        self.test_results = []
        
    def log_test(self, test_name, success, details="", error=""):
        result = {
            "test": test_name,
            "success": success,
            "details": details,
            "error": error,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status}: {test_name}")
        if details:
            print(f"   Details: {details}")
        if error:
            print(f"   Error: {error}")
        print()
    
    def test_personal_info_api(self):
        """Test GET /api/personal-info endpoint"""
        try:
            response = self.session.get(f"{self.base_url}/api/personal-info", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                # Check required fields
                required_fields = ['name', 'title', 'bio', 'skills', 'experience', 'contact', 'social_links', 'profile_image']
                missing_fields = [field for field in required_fields if field not in data]
                
                if missing_fields:
                    self.log_test("Personal Information API", False, 
                                error=f"Missing required fields: {missing_fields}")
                    return False
                
                # Validate data structure
                if not isinstance(data['skills'], list) or len(data['skills']) == 0:
                    self.log_test("Personal Information API", False, 
                                error="Skills should be a non-empty list")
                    return False
                
                if not isinstance(data['experience'], list) or len(data['experience']) == 0:
                    self.log_test("Personal Information API", False, 
                                error="Experience should be a non-empty list")
                    return False
                
                if not isinstance(data['contact'], dict) or 'email' not in data['contact']:
                    self.log_test("Personal Information API", False, 
                                error="Contact should be a dict with email")
                    return False
                
                if not isinstance(data['social_links'], dict):
                    self.log_test("Personal Information API", False, 
                                error="Social links should be a dict")
                    return False
                
                self.log_test("Personal Information API", True, 
                            f"Retrieved personal info for {data['name']} with {len(data['skills'])} skills and {len(data['experience'])} experience entries")
                return True
            else:
                self.log_test("Personal Information API", False, 
                            error=f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Personal Information API", False, error=str(e))
            return False
    
    def test_courses_api(self):
        """Test GET /api/courses endpoint"""
        try:
            response = self.session.get(f"{self.base_url}/api/courses", timeout=10)
            
            if response.status_code == 200:
                courses = response.json()
                
                if not isinstance(courses, list):
                    self.log_test("Courses API", False, error="Response should be a list")
                    return False
                
                if len(courses) == 0:
                    self.log_test("Courses API", False, error="No courses found")
                    return False
                
                # Check required fields for each course
                required_fields = ['id', 'title', 'description', 'price', 'duration', 'difficulty', 
                                 'image_url', 'instructor', 'rating', 'students']
                
                for i, course in enumerate(courses):
                    missing_fields = [field for field in required_fields if field not in course]
                    if missing_fields:
                        self.log_test("Courses API", False, 
                                    error=f"Course {i} missing fields: {missing_fields}")
                        return False
                    
                    # Validate data types
                    if not isinstance(course['price'], (int, float)) or course['price'] <= 0:
                        self.log_test("Courses API", False, 
                                    error=f"Course {i} has invalid price: {course['price']}")
                        return False
                    
                    if not isinstance(course['rating'], (int, float)) or not (0 <= course['rating'] <= 5):
                        self.log_test("Courses API", False, 
                                    error=f"Course {i} has invalid rating: {course['rating']}")
                        return False
                    
                    if not isinstance(course['students'], int) or course['students'] < 0:
                        self.log_test("Courses API", False, 
                                    error=f"Course {i} has invalid student count: {course['students']}")
                        return False
                
                self.log_test("Courses API", True, 
                            f"Retrieved {len(courses)} courses with all required fields")
                return True
            else:
                self.log_test("Courses API", False, 
                            error=f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Courses API", False, error=str(e))
            return False
    
    def test_packages_api(self):
        """Test GET /api/packages endpoint"""
        try:
            response = self.session.get(f"{self.base_url}/api/packages", timeout=10)
            
            if response.status_code == 200:
                packages = response.json()
                
                if not isinstance(packages, dict):
                    self.log_test("Course Packages API", False, error="Response should be a dict")
                    return False
                
                # Check for expected package types
                expected_packages = ['individual', 'bundle', 'subscription']
                missing_packages = [pkg for pkg in expected_packages if pkg not in packages]
                
                if missing_packages:
                    self.log_test("Course Packages API", False, 
                                error=f"Missing package types: {missing_packages}")
                    return False
                
                # Validate package structure
                for pkg_type, pkg_data in packages.items():
                    if not isinstance(pkg_data, dict):
                        self.log_test("Course Packages API", False, 
                                    error=f"Package {pkg_type} should be a dict")
                        return False
                    
                    if 'name' not in pkg_data or 'description' not in pkg_data:
                        self.log_test("Course Packages API", False, 
                                    error=f"Package {pkg_type} missing name or description")
                        return False
                    
                    # Bundle and subscription should have prices
                    if pkg_type in ['bundle', 'subscription'] and 'price' not in pkg_data:
                        self.log_test("Course Packages API", False, 
                                    error=f"Package {pkg_type} missing price")
                        return False
                
                self.log_test("Course Packages API", True, 
                            f"Retrieved {len(packages)} package types: {list(packages.keys())}")
                return True
            else:
                self.log_test("Course Packages API", False, 
                            error=f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Course Packages API", False, error=str(e))
            return False
    
    def test_stripe_checkout_session(self):
        """Test POST /api/payments/v1/checkout/session endpoint"""
        try:
            # First get a course ID for individual course testing
            courses_response = self.session.get(f"{self.base_url}/api/courses", timeout=10)
            if courses_response.status_code != 200:
                self.log_test("Stripe Checkout Session", False, 
                            error="Could not get courses for testing")
                return False
            
            courses = courses_response.json()
            if not courses:
                self.log_test("Stripe Checkout Session", False, 
                            error="No courses available for testing")
                return False
            
            test_course_id = courses[0]['id']
            
            # Test cases for different package types
            test_cases = [
                {
                    "name": "Individual Course",
                    "payload": {
                        "package_type": "individual",
                        "course_id": test_course_id,
                        "success_url": f"{self.base_url}/success",
                        "cancel_url": f"{self.base_url}/cancel",
                        "metadata": {"test": "individual_course"}
                    }
                },
                {
                    "name": "Bundle Package",
                    "payload": {
                        "package_type": "bundle",
                        "success_url": f"{self.base_url}/success",
                        "cancel_url": f"{self.base_url}/cancel",
                        "metadata": {"test": "bundle_package"}
                    }
                },
                {
                    "name": "Subscription Package",
                    "payload": {
                        "package_type": "subscription",
                        "success_url": f"{self.base_url}/success",
                        "cancel_url": f"{self.base_url}/cancel",
                        "metadata": {"test": "subscription_package"}
                    }
                }
            ]
            
            session_ids = []
            
            for test_case in test_cases:
                try:
                    response = self.session.post(
                        f"{self.base_url}/api/payments/v1/checkout/session",
                        json=test_case["payload"],
                        timeout=15
                    )
                    
                    if response.status_code == 200:
                        data = response.json()
                        
                        if 'url' not in data or 'session_id' not in data:
                            self.log_test(f"Stripe Checkout Session - {test_case['name']}", False, 
                                        error="Response missing url or session_id")
                            continue
                        
                        if not data['url'].startswith('https://checkout.stripe.com'):
                            self.log_test(f"Stripe Checkout Session - {test_case['name']}", False, 
                                        error=f"Invalid checkout URL: {data['url']}")
                            continue
                        
                        session_ids.append(data['session_id'])
                        self.log_test(f"Stripe Checkout Session - {test_case['name']}", True, 
                                    f"Created session {data['session_id']}")
                    else:
                        self.log_test(f"Stripe Checkout Session - {test_case['name']}", False, 
                                    error=f"HTTP {response.status_code}: {response.text}")
                        
                except Exception as e:
                    self.log_test(f"Stripe Checkout Session - {test_case['name']}", False, 
                                error=str(e))
            
            # Test checkout status for created sessions
            if session_ids:
                self.test_checkout_status(session_ids[0])
            
            return len(session_ids) > 0
            
        except Exception as e:
            self.log_test("Stripe Checkout Session", False, error=str(e))
            return False
    
    def test_checkout_status(self, session_id):
        """Test GET /api/payments/v1/checkout/status/{session_id} endpoint"""
        try:
            response = self.session.get(
                f"{self.base_url}/api/payments/v1/checkout/status/{session_id}",
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                
                required_fields = ['session_id', 'status', 'payment_status', 'amount_total', 'currency']
                missing_fields = [field for field in required_fields if field not in data]
                
                if missing_fields:
                    self.log_test("Stripe Checkout Status", False, 
                                error=f"Missing required fields: {missing_fields}")
                    return False
                
                if data['session_id'] != session_id:
                    self.log_test("Stripe Checkout Status", False, 
                                error=f"Session ID mismatch: expected {session_id}, got {data['session_id']}")
                    return False
                
                self.log_test("Stripe Checkout Status", True, 
                            f"Retrieved status for session {session_id}: {data['status']}/{data['payment_status']}")
                return True
            else:
                self.log_test("Stripe Checkout Status", False, 
                            error=f"HTTP {response.status_code}: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Stripe Checkout Status", False, error=str(e))
            return False
    
    def test_mongodb_data(self):
        """Test MongoDB data initialization by checking if courses are properly stored"""
        try:
            # Test courses endpoint to verify MongoDB data
            response = self.session.get(f"{self.base_url}/api/courses", timeout=10)
            
            if response.status_code == 200:
                courses = response.json()
                
                if len(courses) >= 3:  # Should have at least 3 sample courses
                    # Check if courses have proper MongoDB structure (UUID IDs, not ObjectIds)
                    for course in courses:
                        if 'id' not in course:
                            self.log_test("MongoDB Data Initialization", False, 
                                        error="Course missing UUID id field")
                            return False
                        
                        # Check if ID is UUID format (not ObjectId)
                        try:
                            import uuid
                            uuid.UUID(course['id'])
                        except ValueError:
                            self.log_test("MongoDB Data Initialization", False, 
                                        error=f"Course ID is not valid UUID: {course['id']}")
                            return False
                    
                    self.log_test("MongoDB Data Initialization", True, 
                                f"MongoDB properly initialized with {len(courses)} courses using UUID IDs")
                    return True
                else:
                    self.log_test("MongoDB Data Initialization", False, 
                                error=f"Expected at least 3 courses, found {len(courses)}")
                    return False
            else:
                self.log_test("MongoDB Data Initialization", False, 
                            error=f"Could not verify MongoDB data: HTTP {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("MongoDB Data Initialization", False, error=str(e))
            return False
    
    def run_all_tests(self):
        """Run all backend tests"""
        print("=" * 60)
        print("BACKEND API TESTING SUITE")
        print("=" * 60)
        print()
        
        # Test basic API endpoints
        self.test_personal_info_api()
        self.test_courses_api()
        self.test_packages_api()
        
        # Test MongoDB data
        self.test_mongodb_data()
        
        # Test Stripe payment integration
        self.test_stripe_checkout_session()
        
        # Summary
        print("=" * 60)
        print("TEST SUMMARY")
        print("=" * 60)
        
        passed = sum(1 for result in self.test_results if result['success'])
        total = len(self.test_results)
        
        print(f"Total Tests: {total}")
        print(f"Passed: {passed}")
        print(f"Failed: {total - passed}")
        print(f"Success Rate: {(passed/total)*100:.1f}%")
        print()
        
        # List failed tests
        failed_tests = [result for result in self.test_results if not result['success']]
        if failed_tests:
            print("FAILED TESTS:")
            for test in failed_tests:
                print(f"❌ {test['test']}: {test['error']}")
        else:
            print("🎉 ALL TESTS PASSED!")
        
        return passed == total

if __name__ == "__main__":
    tester = BackendTester(BACKEND_URL)
    success = tester.run_all_tests()
    exit(0 if success else 1)