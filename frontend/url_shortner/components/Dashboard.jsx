import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [historyError, setHistoryError] = useState("");

  const baseUrl = "http://localhost:5000/url";

  useEffect(() => {
    let isMounted = true;

    const fetchHistory = async () => {
      try {
        setIsLoadingHistory(true);
        setHistoryError("");
        const res = await axios.get(`${baseUrl}/all`, {withCredentials: true});
        console.log(res.data);
        const payload = res.data?.urls ?? res.data ?? [];
        if (isMounted) {
          setHistory(Array.isArray(payload) ? payload : []);
        }
      } catch (err) {
        if (isMounted) {
          setHistoryError(
            "Could not load previous URLs. Make sure the backend exposes GET /url/all."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoadingHistory(false);
        }
      }
    };

    fetchHistory();

    return () => {
      isMounted = false;
    };
  }, [baseUrl]);

  const handleSubmit = async () => {
    if (url.trim().length === 0) {
      setError("Enter URL please.");
      setShortUrl("");
      return;
    }

    try {
      setError("");
      const res = await axios.post(`${baseUrl}/shorten`, {
        originalURL: url.trim(),
      }, {withCredentials: true});
      const shortId = res.data.shortID;
      const generatedShortUrl = `${baseUrl}/${shortId}`;
      setShortUrl(generatedShortUrl);

      if (shortId) {
        setHistory((prev) => [
          { shortID: shortId, redirectURL: url.trim() },
          ...prev,
        ]);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  const handleDelete = async (shortID) => {
    try {
        await axios.delete(`${baseUrl}/${shortID}`, {
        withCredentials: true,
        });

        // remove from UI after successful delete
        setHistory((prev) =>
        prev.filter((item) => item.shortID !== shortID)
        );
    } catch (err) {
        alert("Failed to delete URL");
    }
  };


  return (
    <>
      <div className="min-h-screen bg-slate-100">
        <div className="mx-auto w-full max-w-3xl px-6 py-10">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-bold text-slate-900">URL Shortener</h1>
            <p className="mt-1 text-sm text-slate-500">
              Paste a long URL to generate a short one.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                type="text"
                placeholder="https://example.com/some/very/long/url"
              />
              <button
                className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                onClick={handleSubmit}
              >
                Shorten
              </button>
            </div>

            {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

            {shortUrl && (
              <div className="mt-5 rounded-lg border border-blue-100 bg-blue-50 p-4">
                <p className="text-sm font-semibold text-slate-700">
                  Your short URL:
                </p>
                <a
                  href={shortUrl}
                  className="mt-1 block text-sm font-semibold text-blue-600 hover:text-blue-700"
                  target="_blank"
                  rel="noreferrer"
                >
                  {shortUrl}
                </a>
              </div>
            )}
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-slate-900">
              Previously shortened URLs
            </h2>
            <p className="text-sm text-slate-500">
              Your existing conversions appear here.
            </p>

            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              {isLoadingHistory && (
                <p className="text-sm text-slate-500">Loading...</p>
              )}

              {!isLoadingHistory && historyError && (
                <p className="text-sm text-amber-600">{historyError}</p>
              )}

              {!isLoadingHistory && !historyError && history.length === 0 && (
                <p className="text-sm text-slate-500">
                  No URLs yet. Shorten one above to get started.
                </p>
              )}

              {!isLoadingHistory && !historyError && history.length > 0 && (
                <ul className="space-y-3">
                  {history.map((item, index) => {
                    const shortId = item.shortID || item.shortId || item.id;
                    const original =
                      item.redirectURL || item.originalURL || item.url;
                    const resolvedShortUrl = shortId
                      ? `${baseUrl}/${shortId}`
                      : item.shortUrl || "";

                    return (
                      <li
                        key={`${shortId || index}`}
                        className="rounded-lg border border-slate-200 p-3"
                        >
                        <p className="text-xs font-semibold uppercase text-slate-400">
                            Original
                        </p>
                        <p className="text-sm text-slate-700 break-all">
                            {original}
                        </p>

                        <div className="mt-2 flex items-center justify-between gap-4">
                            <div>
                            <p className="text-xs font-semibold uppercase text-slate-400">
                                Short
                            </p>
                            {resolvedShortUrl ? (
                                <a
                                href={resolvedShortUrl}
                                className="text-sm font-semibold text-blue-600 hover:text-blue-700 break-all"
                                target="_blank"
                                rel="noreferrer"
                                >
                                {resolvedShortUrl}
                                </a>
                            ) : (
                                <p className="text-sm text-slate-500">
                                Short URL unavailable
                                </p>
                            )}
                            </div>

                            {/* 🗑 Delete button */}
                            <button
                            onClick={() => handleDelete(shortId)}
                            className="rounded-md bg-red-100 px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-200"
                            >
                            Delete
                            </button>
                        </div>
                        </li>

                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
