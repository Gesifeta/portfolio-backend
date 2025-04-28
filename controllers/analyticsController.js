import { ordinaryDatabaseQuery } from "../database/db.js";

export const trackUserVisitor = async (req, res) => {
  try {
    const {
      path,
      referrer,
      userAgent,
      language,
      screenResolution,
      timestamp,
      sessionId,
      country,
      countryCode,
      city,
      region,
      timezone,
    } = JSON.parse(req.body);

    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    const query = `
      INSERT INTO visitor_logs (
        session_id,
        ip_address,
        path,
        referrer,
        user_agent,
        language,
        screen_resolution,
        timestamp,
        country,
        country_code,
        city,
        region,
        timezone
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING id
    `;

    const values = [
      sessionId,
      ip,
      path,
      referrer,
      userAgent,
      language,
      screenResolution,
      timestamp,
      country,
      countryCode,
      city,
      region,
      timezone,
    ];

    const result = await ordinaryDatabaseQuery(query, values);

    res.status(200).json({
      success: true,
      id: result.rows[0].id,
    });
  } catch (error) {
    console.error("Error tracking visitor:", error);
    res.status(500).json({
      success: false,
      message: "Error tracking visitor",
    });
  }
};
// Track country page view
export const trackCountryPageView = async (req, res) => {
  try {
    const {
      path,
      referrer,
      userAgent,
      language,
      screenResolution,
      timestamp,
      sessionId,
      country,
      countryCode,
      city,
      region,
      timezone,
    } = JSON.parse(req.body);

    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    const query = `
      INSERT INTO visitor_logs (
        session_id,
        ip_address,
        path,
        referrer,
        user_agent,
        language,
        screen_resolution,
        timestamp,
        country,
        country_code,
        city,
        region,
        timezone
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING id
    `;

    const values = [
      sessionId,
      ip,
      path,
      referrer,
      userAgent,
      language,
      screenResolution,
      timestamp,
      country,
      countryCode,
      city,
      region,
      timezone,
    ];

    const result = await ordinaryDatabaseQuery(query, values);

    res.status(200).json({
      success: true,
      id: result.rows[0].id,
    });
  } catch (error) {
    console.error("Error tracking visitor:", error);
    res.status(500).json({
      success: false,
      message: "Error tracking visitor",
    });
  }
};
export const trackCountryVisitor = async (req, res) => {
  try {
    const {
      path,
      referrer,
      userAgent,
      language,
      screenResolution,
      timestamp,
      sessionId,
    } = JSON.parse(req.body);

    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    const query = `
      INSERT INTO visitor_logs (
        session_id,
        ip_address,
        path,
        referrer,
        user_agent,
        language,
        screen_resolution,
        timestamp
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id
    `;

    const values = [
      sessionId,
      ip,
      path,
      referrer,
      userAgent,
      language,
      screenResolution,
      timestamp,
    ];

    const result = await ordinaryDatabaseQuery(query, values);

    res.status(200).json({
      success: true,
      id: result.rows[0].id,
    });
  } catch (error) {
    console.error("Error tracking visitor:", error);
    res.status(500).json({
      success: false,
      message: "Error tracking visitor",
    });
  }
};
export const getUserAnalytics = async (req, res) => {
  try {
    // Get visitor count
    const visitorQuery = `
      SELECT 
        COUNT(DISTINCT session_id) as unique_visitors,
        COUNT(*) as total_pageviews,
        COUNT(DISTINCT ip_address) as unique_ips
      FROM visitor_logs
      WHERE timestamp >= NOW() - INTERVAL '24 hours'
    `;

    // Get popular pages
    const pagesQuery = `
      SELECT 
        path,
        COUNT(*) as views
      FROM visitor_logs
      GROUP BY path
      ORDER BY views DESC
      LIMIT 10
    `;

    const [visitorStats, popularPages] = await Promise.all([
      ordinaryDatabaseQuery(visitorQuery),
      ordinaryDatabaseQuery(pagesQuery),
    ]);

    res.json({
      stats: visitorStats.rows[0],
      popularPages: popularPages.rows,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ error: "Error fetching analytics" });
  }
};
// controllers/dashboardController.js
export const getCountryAnalytics = async (req, res) => {
  try {
    // Get visitors by country
    const countryQuery = `
      SELECT 
        country,
        country_code,
        COUNT(DISTINCT session_id) as unique_visitors,
        COUNT(*) as total_pageviews
      FROM visitor_logs
      WHERE timestamp >= NOW() - INTERVAL '30 days'
      GROUP BY country, country_code
      ORDER BY unique_visitors DESC
      LIMIT 10
    `;

    // Get visitors by timezone
    const timezoneQuery = `
      SELECT 
        timezone,
        COUNT(DISTINCT session_id) as unique_visitors
      FROM visitor_logs
      WHERE timestamp >= NOW() - INTERVAL '30 days'
      GROUP BY timezone
      ORDER BY unique_visitors DESC
    `;

    const [countryStats, timezoneStats] = await Promise.all([
      ordinaryDatabaseQuery(countryQuery),
      ordinaryDatabaseQuery(timezoneQuery),
    ]);

    res.json({
      countries: countryStats.rows,
      timezones: timezoneStats.rows,
    });
  } catch (error) {
    console.error("Error fetching country analytics:", error);
    res.status(500).json({ error: "Error fetching analytics" });
  }
};
