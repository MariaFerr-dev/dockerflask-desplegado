def test_ejemplo_basico():
    assert 1 + 1 == 2


def test_home(monkeypatch):
    sample_app = __import__("sample_app")
    monkeypatch.setattr(
        sample_app.pymysql,
        "connect",
        lambda **kwargs: (_ for _ in ()).throw(sample_app.pymysql.MySQLError("offline")),
    )
    response = sample_app.sample.test_client().get("/")
    assert response.status_code == 200