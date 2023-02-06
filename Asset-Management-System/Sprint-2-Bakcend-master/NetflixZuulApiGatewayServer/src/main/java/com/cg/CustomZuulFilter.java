package com.cg;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import com.netflix.zuul.exception.ZuulException;

@Component
public class CustomZuulFilter extends ZuulFilter{

private Logger logger = LoggerFactory.getLogger(this.getClass());
    
    @Override
    public boolean shouldFilter() {
        System.out.println("inside shouldFilter");
        return true; //if we want it for every request
    }

    @Override
    public Object run() throws ZuulException {
        System.out.println("inside run()");
        
        //logic of the filter
        HttpServletRequest request = RequestContext.getCurrentContext().getRequest();
        logger.info("request -> {} request uri -> {}",request,request.getRequestURI());                
        return null;
    }

 

    @Override
    public String filterType() {
        System.out.println("inside filterType");
        return "pre"; //pre, post or error
    }

 

    @Override
    public int filterOrder() {
        System.out.println("inside filterOrder");
        return 1; //it is a priority order between different Zuul filters.
    }
}
