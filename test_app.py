def test_ejemplo_basico():
    assert 1 + 1 == 2


def test_home():
    sample_app = __import__("sample_app")
    response = sample_app.sample.test_client().get("/")
    assert response.status_code == 200